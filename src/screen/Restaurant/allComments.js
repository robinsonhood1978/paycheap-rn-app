import React, { Component } from 'react';
import { Container, Text, Content, Spinner, Toast } from 'native-base';
import { connect } from 'react-redux';
import { getRestaurantComment } from '../../api/restaurant'
import CommentsListMap from '../../components/commentListMap'
import {minusScrollHeight} from '../../utils/utils'
class AllRestaurantComments extends Component {
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam("name") }
    };
    constructor(props) {
        super(props);
        this.state = {
            pageLoading: true,
            loading: false,
            noMore: false,
            preventRepeat: false,
            page: 1,
            limit: 6,
            comments: [],
        }
        this.handleCommentsScroll = this.handleCommentsScroll.bind(this);
        this.getAllComments = this.getAllComments.bind(this);
    }

    componentDidMount() {
        this.getAllComments(this.state.page, this.state.limit, data => {
            this.state.page = this.state.page + 1;
            this.setState({ comments: data, pageLoading: false });
        })
    }

    handleCommentsScroll(event) {
        if (event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height - minusScrollHeight) {
            if (this.state.loading || this.state.noMore) return;
            this.state.loading = true;
            this.setState({ loading: true });
            this.getAllComments(this.state.page, this.state.limit, data => {
                this.state.page = this.state.page + 1;
                data.forEach(el => {
                    this.state.comments.push(el);
                })
                this.setState({ comments: this.state.comments });
            })
        }
    }

    getAllComments(page, limit, callback) {
        if (this.state.noMore || this.state.preventRepeat) return;
        this.state.preventRepeat = true;
        const offset = page - 1;
        const restaurant_id = this.props.navigation.getParam('restaurant_id');
        getRestaurantComment({ offset, limit, restaurant_id }).then(res => {
            const data = res.data.data;
            this.state.preventRepeat = false;
            this.setState({ loading: false });
            this.state.noMore = data.length < this.state.limit;
            callback(data);
        }).catch(err => {
            this.state.preventRepeat = false;
            this.setState({ loading: false });
            Toast.show({
                text: this.props.language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            });
        });
    }

    render() {
        const { pageLoading, comments, loading, noMore } = this.state
        const { language } = this.props;
        return (
            <Container>
                <Content showsVerticalScrollIndicator={false} onScroll={this.handleCommentsScroll} style={{ marginLeft: "4%", width: "92%" }}>
                    {pageLoading ?
                        <Spinner color='#ff6933' />
                        : <CommentsListMap
                            comments={comments}
                            language={language}
                        />}
                    {loading && !pageLoading ?
                        <Spinner color='#ff6933' />
                        : noMore ?
                            <Text style={{ textAlign: "center", color: "#afaeae", lineHeight: 50, fontSize: 12 }}>{language.message.Bottom}</Text>
                            : comments.length > 0 ?
                                <Text style={{ textAlign: "center", color: "#bfbebe", lineHeight: 40, fontSize: 12 }}>{language.message.PullToRefresh}</Text>
                                : null}
                </Content>
            </Container>
        );
    }
}

export default connect(state => state.language)(AllRestaurantComments)