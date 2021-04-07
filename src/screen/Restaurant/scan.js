'use strict';

import React, { Component } from 'react';

import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam("name") }
    };

    constructor(props) {
        super(props);
      
    }

    onSuccess = (e) => {
        if (e.data.substr(0, e.data.lastIndexOf('/')) === 'https://app.pay-cheap.com/merchant') {
            this.props.navigation.navigate('StoreDetail', { store_id: Number(e.data.substr(e.data.lastIndexOf('/') + 1)) })
        } else {
            alert("Wrong QR Code")
        }
    }

    render() {
        return (
            <QRCodeScanner
                fadeIn={false}
                onRead={this.onSuccess}
                cameraStyle={styles.cameraContainer}
                topViewStyle={styles.zeroContainer}
                bottomViewStyle={styles.zeroContainer}
                topContent={
                    <Text style={styles.centerText}>
                     Scan QR Code
                    </Text>
                  }
            />
        );
    }
}

const styles = StyleSheet.create({
    zeroContainer: {
        height: 0,
        flex: 0,
    },
    cameraContainer: {
        height: Dimensions.get('window').height,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});