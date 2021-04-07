import { location } from '../src/api/location'
import { getOneStore } from '../src/api/restaurant'
// import { testPayIn } from '../src/api/order'


beforeAll(() => {
  jest.mock('@react-native-community/async-storage');
})

// test("Pay In Store Test", done => {
//   order_id = 10752;
//   order_id2 = 10751;
//   Promise.all(
//     [
//       testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id),
//       testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2), testPayIn(order_id2),
//     ]

//   ).then(
//     values => {
//       values.forEach(item => {
//         console.log(item.data.status, item.data.id)
//       })
//       expect(1).toBe(1);
//       done()
//     }
//   )
// }, 20000)

// test("Pay In Store Test 2", done => {
//   order_id = 10748;
//   Promise.all([testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id), testPayIn(order_id)]).then(
//     values => {
//       values.forEach(item => {
//         console.log(item.data.status, order_id)
//       })
//       expect(1).toBe(1);
//       done()
//     }
//   )
// }, 20000)


test("Location Test", done => {
  location().then(
    res => {
      expect(res.data.status).toBe(200);
      done()
    }
  )
}, 10000)


test("get One Store", done => {
  getOneStore({ restaurant_id: 4 }).then(res => {
    expect(res.data.status).toBe(200);
    done()
  })
}, 10000)
