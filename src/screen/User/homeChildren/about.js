import React, { Component } from 'react';
import { View, Container, Content, Text } from 'native-base';
import { Image, Dimensions } from "react-native"


export default class AboutUs extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width * 1.765
        };
    }

    render() {
        const { width, height } = this.state
        return (
            <Container>
                <Content showsVerticalScrollIndicator={false} style={{ width: "90%", marginLeft: "5%" }}>
                    <View style={{ alignItems: "center", marginTop: 5 }}>
                        {/* <Image source={require("../../../static/img/aboutus.png")} style={{ width, height }}></Image> */}
                        <Text style={{fontSize:13}}>
                            Paycheap respects and protects the privacy of all users who use the service. In order to provide you with more accurate and personalized services, Paycheap will use and disclose your personal information in accordance with this Privacy Policy. However, Paycheap will treat this information with a high degree of diligence and prudence. Except as otherwise provided in this Privacy Policy, Paycheap will not disclose or provide such information to third parties without your prior permission. Paycheap will update this Privacy Policy from time to time. By agreeing to the Paycheap Service Use Agreement, you are deemed to have agreed to the entire content of this Privacy Policy. This Privacy Policy is an integral part of the Paycheap Service Use Agreement.
                        {'\n'}
                            {'\n'}    1. Scope of application
                        {'\n'}   a) Personal registration information provided by Paycheap when you sign up for a Paycheap account;
                        {'\n'}    b) the information on your browser and computer that Paycheap automatically receives and records when you use the Paycheap web service or access the Paycheap platform webpage, including but not limited to your IP address, browser type, language used, Access data such as date and time, hardware and software feature information, and web page records you need;
                        {'\n'}    c) User personal data that Paycheap obtains from business partners through legal channels.
         {'\n'}
                            {'\n'}    You understand and agree that the following information does not apply to this Privacy Policy:
         {'\n'}    a) keyword information that you enter when using the search service provided by the Paycheap platform;
         {'\n'}     b) relevant information collected by Paycheap from you at Paycheap, including but not limited to participation activities, transaction information and evaluation details;
         {'\n'}    c) Violation of the law or violation of the Paycheap rules and the actions that Paycheap has taken against you.
         {'\n'}
                            {'\n'}   2. Information use
         {'\n'}      a) Paycheap will not provide, sell, rent, share or trade your personal information to any unrelated third party, unless you have your permission in advance, or the third party and Paycheap (including Paycheap affiliates) provide services to you individually or jointly. And after the service is over, it will be blocked from accessing all of the material that it has previously been able to access.
         {'\n'}     b) Paycheap also does not allow any third party to collect, edit, sell or distribute your personal information by any means. Any Payachap platform user who engages in the above activities, once discovered, Paycheap has the right to immediately terminate the service agreement with the user.
         {'\n'}     c) For the purpose of serving the User, Paycheap may use your personal information to provide you with information of interest to you, including but not limited to, to send you product and service information, or to share information with Paycheap partners so that they may send you Information about its products and services (the latter requires your prior consent).
         {'\n'}
                            {'\n'}    3. Disclosure of Information In the following circumstances, Paycheap will disclose your personal information in whole or in part according to your personal wishes or the law:
         {'\n'}     a) disclose to third parties with your prior consent;
         {'\n'}    b) in order to provide the products and services you request, you must share your personal information with third parties;
         {'\n'}   c) disclosure to third parties or administrative or judicial authorities in accordance with the relevant provisions of the law, or at the request of the administrative or judicial authorities;
         {'\n'}   d) If you are in violation of relevant Chinese laws, regulations or Paycheap service agreements or related rules, you need to disclose to third parties;
         {'\n'}    e) If you are a qualified IP Complainant and have filed a complaint, it should be disclosed to the Respondent at the request of the Complainant so that the parties can handle possible rights disputes;
         {'\n'}    f) In a transaction created on the Paycheap platform, if any party to the transaction performs or partially fulfills its trading obligations and requests for information disclosure, Paycheap has the right to decide to provide the user with the necessary information such as the contact information of the counterparty to Facilitate the completion of the transaction or the resolution of the dispute.
         {'\n'}     g) Other disclosures that Paycheap deems appropriate in accordance with laws, regulations or website policies.
         {'\n'}
                            {'\n'}   4. Information Storage and Exchange Information and materials collected by Paycheap will be stored on the servers of Paycheap and/or its affiliates, which may be sent to your country, region or location where Paycheap collects information and materials. It is accessed, stored and displayed outside the country and abroad.
         {'\n'}
                            {'\n'}   5. Use of cookies
         {'\n'}   a) If you do not refuse to accept cookies, Paycheap will set or access cookies on your computer so that you can log in or use the Paycheap platform services or features that rely on cookies. Paycheap uses cookies to provide you with more thoughtful and personalized services, including promotional services.
         {'\n'}   b) You have the right to choose to accept or decline to accept cookies. You can refuse to accept cookies by modifying your browser settings. However, if you choose to refuse to accept cookies, you may not be able to log in or use the Paycheap web services or features that rely on cookies.
         {'\n'}    c) This policy will apply to information obtained through the cookies provided by Paycheap.
         {'\n'}
                            {'\n'}    6. Information security
         {'\n'}    a) Paycheap account has security protection function, please keep your username and password information safe. Paycheap will ensure that your information is not lost, misused and altered by security measures such as encrypting user passwords. Despite the aforementioned security measures, please also note that there are no “perfect security measures” on the information network.
         {'\n'}     b) When using the Paycheap web service for online transactions, you will inevitably disclose your personal information, such as contact information or postal address, to the counterparty or potential counterparty. Please protect your personal information and provide it to others only when necessary. If you find that your personal information has been compromised, especially if your Paycheap username and password are compromised, please contact Paycheap customer service immediately so that Paycheap can take appropriate action.
         {'\n'}
                        </Text>
                    </View>
                </Content></Container>
        );
    }
}