import React, { Component } from 'react';
import { Container, View, Spinner } from 'native-base';
import StoreList from "../Restaurant/RComponents/storeList"
import { connect } from 'react-redux';


class CategoryStoreList extends Component {
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam("type") }
    };

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam("type"),
            loading:false
        }
        this.refCategoryList = this.refCategoryList.bind(this)
        this.changeCategoryLoading = this.changeCategoryLoading.bind(this)
    }

    refCategoryList(ref) {
        this.childList = ref
    }

    changeCategoryLoading(value) {
        this.setState({ loading: value });
    }
    componentDidMount(){
        if (this.childList) {
            this.childList.firstStoreFetch()
        }
    }

    render() {
        const { type ,loading} = this.state
        const { lat, lng } = this.props;
        return (
            <Container>
                {loading ? <View style={{ width: "100%", marginTop: "20%" }}><Spinner color="#ff6933" /></View> : null}
            <StoreList
                onRefList={this.refCategoryList}
                changeLoading={this.changeCategoryLoading}
                navigation={this.props.navigation}
                type={type}
                lat={lat}
                lng={lng}
            />
               </Container>
        );
    }
}

export default connect(state => state.location)(CategoryStoreList)