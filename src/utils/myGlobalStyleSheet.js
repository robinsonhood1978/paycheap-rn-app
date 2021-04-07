import { StyleSheet, Platform, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isIphoneX = (Platform.OS === 'ios' && screenWidth === 375 && screenHeight === 812) || (Platform.OS === 'ios' && screenWidth === 414 && screenHeight === 896)
const root = isIphoneX ? { marginTop: 40 } : (Platform.OS === 'ios') ? { marginTop: 20 } : {};

const myGlobalStyleSheet = StyleSheet.create({
  fullButton: {
    width: "94%",
    marginLeft: "3%",
    backgroundColor: '#ff6933'
  },
  fullButtontext: {
    fontSize: 24,
    lineHeight: 24,
    textTransform: 'capitalize'
  },
  root,
  title: {
    fontSize: 22, fontWeight: "700"
  },
  tab: {
    marginLeft: "5%",
    paddingBottom: 3,
    width: "90%",
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabFix: {
    borderBottomColor: "#eee",
     borderBottomWidth: 1,
    zIndex: 10,
    backgroundColor: "#fff",
    paddingTop: 8,
    marginLeft: "5%",
    paddingBottom: 8,
    width: "90%",
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabButtonText: {
    fontSize: 11,
    color: '#6f6e6e',
  },
  tabActiveButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: '#ff6933',
  },
  tabButton: {
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#fff',
    textAlign: "center",
  },
  tabActiveButton: {
    borderRadius: 5,
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: "#ff6933",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  tabOrder: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    height: 24,
    zIndex: 2
  },
  tabOrderIndex: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    height: 32,
    zIndex: 2
  },
  tabOrderButton: {
    width: screenWidth / 5,
    backgroundColor: '#fff',
    textAlign: "center"
  },
  tabOrderActiveButton: {
    width: screenWidth / 5,
    borderBottomWidth: 3,
    borderBottomColor: "#ff6933",
    backgroundColor: "#fff",
    textAlign: "center",
    paddingBottom:8

  },
  inactive: {
    color: "#9f9e9e",
    lineHeight: 30
  }, active: {
    color: "#ff6933", lineHeight: 30
  }
});
export default myGlobalStyleSheet;