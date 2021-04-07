import React, { Component } from 'react';
import { View, Text, Container, Form, Textarea, Toast, Button, Content } from 'native-base';
import { connect } from 'react-redux';
import Stars from './OComponents/orderStar'
import { makeTheComment } from "../../api/order"
import action from '../../store/action'

class OrderComment extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name"),
            headerRight: <Button onPress={navigation.getParam("submitComment")} transparent><Text style={{ fontSize: 14, color: "#ff6933" }}>{navigation.getParam("submitText")}</Text></Button>
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            order_id: this.props.navigation.getParam("order_id"),
            score: 5,
            comment_data: "",
            preventRepeat: false
        };
        this.changeCommentScore = this.changeCommentScore.bind(this)
        this.submitComment = this.submitComment.bind(this)
        this.handleContent = this.handleContent.bind(this)
    }

    handleContent(value) {
        this.setState({ comment_data: value });
    }
    submitComment() {
        if (this.state.preventRepeat) return
        const { score: food_score, order_id, comment_data } = this.state
        const { language } = this.props;
        if (comment_data.length < 2) {
            Toast.show({
                text: language.order.AtLeast,
                buttonText: 'Okay',
                type: "warning"
            });
            return;
        }
        this.setState({ preventRepeat: true })
        this.props.global_action_loading()
        makeTheComment({ food_score, order_id, comment_data }).then(res => {
            if (res.data.status === 200) {
                Toast.show({
                    text: language.order.CommentSuccessfully,
                    buttonText: 'Okay',
                    type: "success"
                });

            } else {
                Toast.show({
                    text: language.alert.Error,
                    buttonText: 'Okay',
                    type: "warning"
                });
            }
            this.props.global_action_loading(false)
            this.setState({ preventRepeat: false })
            this.props.order_refresh()
            this.props.navigation.navigate('OrderList');
        }
        ).catch(err => {
            this.props.global_action_loading(false)
            this.setState({ preventRepeat: false })
            Toast.show({
                text: language.alert.Error,
                buttonText: 'Okay',
                type: "warning"
            });
        })
    }

    changeCommentScore(score) {
        this.setState({ score })
    }

    componentDidMount() {
        this.props.navigation.setParams({ submitComment: this.submitComment });
        this.props.navigation.setParams({ submitText: this.props.language.order.Submit });
    }

    render() {
        const { score, comment_data } = this.state
        const { locale } = this.props
        return (
            <Container>
                <Container><Content style={{ width: "80%", marginLeft: "10%", marginTop: "5%" }}>
                    <View style={{ width: "100%" }}>
                        <Form style={{ alignItems: "center" }}>
                            <Stars score={score} iconStyle={{ fontSize: 40, color: "#ff6933" }} changeScore={this.changeCommentScore} />
                            <Textarea value={comment_data} onChangeText={this.handleContent} style={{ width: "98%", borderRadius: 5 }} rowSpan={6} bordered placeholder={locale === "cn" ? "请添加评论" : "Please comment for us"} />
                        </Form>
                    </View>
                </Content></Container>
            </Container>
        );
    }
}

export default connect(state => state.language, { ...action.order, ...action.globalLoading })(OrderComment)