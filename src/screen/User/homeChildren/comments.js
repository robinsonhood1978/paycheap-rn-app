import React, { Component } from 'react';
import { View, Text, Container, Content, Spinner, Toast } from 'native-base';
import { Image } from "react-native"
import CommentListMap from '../../../components/commentListMap'
import { connect } from 'react-redux';
import { checkUserAuth } from '../../../utils/auth';
import { myComments, deleteComment } from '../../../api/user'
import action from '../../../store/action';
import {minusScrollHeight} from '../../../utils/utils'
class MyComments extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 6,
            noMore: false,
            comments: [],
            loading: false,
            hasUser: false,
            preventRepeat: false,
            stopPull: false,
            pullLoading: false,
        };
        this.deleteMyComment = this.deleteMyComment.bind(this);
        this.handleMyCommentsScroll = this.handleMyCommentsScroll.bind(this);
        this.getMyComments = this.getMyComments.bind(this);
    }

    handleMyCommentsScroll(event) {
        if (event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height - minusScrollHeight) {
            if (this.state.stopPull || this.state.noMore) return
            this.state.stopPull = true;
            this.getMyComments(this.state.page, this.state.limit, data => {
                this.state.stopPull = false;
                this.state.page = this.state.page + 1;
                data.forEach(el => {
                    this.state.comments.push(el);
                })
                this.setState({ comments: this.state.comments })
            });
        }
    }

    getMyComments(page, limit, callback) {
        if (this.state.noMore || this.state.pullLoading) return;
        this.setState({ pullLoading: true })
        let offset = page - 1;
        myComments({ offset, limit }).then(res => {
            let data = res.data.data;
            this.state.noMore = data.length < this.state.limit;
            this.setState({ pullLoading: false })
            callback(data);
        }).catch(err => {
            Toast.show({
                text: this.props.language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            });
        })
    }

    deleteMyComment(id, index) {
        if (this.state.preventRepeat) return;
        this.setState({ preventRepeat: true });
        this.props.global_action_loading()
        const { language } = this.props;
        const { comments } = this.state
        deleteComment({ id }).then((response) => {
            this.setState({ preventRepeat: false });
            this.props.global_action_loading(false)
            if (response.data.status === 200) {
                Toast.show({
                    text: language.alert.deleteSuccessfully,
                    buttonText: 'Okay',
                    type: "success"
                })
                comments.splice(index, 1)
                this.setState({ comments })

            } else {
                Toast.show({
                    text: language.alert.deleteFailed,
                    buttonText: 'Okay',
                    type: "waring"
                })
            }
        }).catch(err => {
            this.setState({ preventRepeat: false });
            this.props.global_action_loading(false)
            Toast.show({
                text: language.alert.deleteFailed,
                buttonText: 'Okay',
                type: "waring"
            })
        })
    }

    componentDidMount() {
        checkUserAuth(() => {
        }, () => {
            this.setState({ loading: true, hasUser: true });
            this.getMyComments(this.state.page, this.state.limit, data => {
                this.state.page++;
                this.setState({ comments: data, loading: false });
            })
        })
    }

    render() {
        const { hasUser, loading, comments, noMore, pullLoading } = this.state
        const { language, locale } = this.props
        return (
            <Container><Content style={{ width: "92%", marginLeft: "4%" }} showsVerticalScrollIndicator={false} onScroll={this.handleMyCommentsScroll}>
                {(!hasUser || (comments.length === 0 && !loading)) ? <View style={{ alignItems: "center", marginTop: 150 }}>
                    <Image source={require("../../../static/img/haimeiyoupingjia.png")} style={{ width: 250, height: 250, marginBottom: 40 }}></Image>
                    <Text style={{ fontSize: 18, color: "#6f6e6e" }}>{language.message.NoReview}</Text>
                </View> : loading ? <Spinner color='#ff6933' /> : <CommentListMap
                    comments={comments}
                    delete={true}
                    deleteTheComment={this.deleteMyComment}
                    language={language}
                    locale={locale}
                />}
                {pullLoading && !loading ?
                    <Spinner color='#ff6933' />
                    : noMore&&(!(!hasUser || (comments.length === 0 && !loading))) ?
                        <Text style={{ textAlign: "center", color: "#afaeae", lineHeight: 50, fontSize: 12 }}>{language.message.Bottom}</Text> : comments.length > 0 ?
                            <Text style={{ textAlign: "center", color: "#bfbebe", lineHeight: 40, fontSize: 12 }}>{language.message.PullToRefresh}</Text>
                            : null}
            </Content></Container>
        );
    }
}
export default connect(state => state.language, action.globalLoading)(MyComments)