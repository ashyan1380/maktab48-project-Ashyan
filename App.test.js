import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
// "product": [
//   {
//     "productName":"پنیر سفید",
//     "price":"10",
//     "number":"1",
//     "category":"لبنیات",
//     "image":"https://static1.borna.news/thumbnail/kQgO3pIH1VrZ/yuiQdPxUgyILPypExSqkWVexFSgSRltN2ZvL5vX-_oL5SMFaqVjbXcnvO0GLTcsXiAh0PjtNPGk,/%D9%BE%D9%86%DB%8C%D8%B1+%D8%B5%D8%A8%D8%AD%D8%A7%D9%86%D9%87.jpg",
//     "id":"1"
//   },
//   {
//     "productName":"ماست",
//     "price":"15",
//     "number":"7555",
//     "category":"لبنیات",
//     "image":"https://digifood.ir/wp-content/uploads/2020/08/mast-digifood-asli.jpg",
//     "id":"2"
//   },{
//     "productName":"شیر",
//     "price":"14",
//     "number":"7555",
//     "category":"لبنیات",
//     "image":"https://cdn.isna.ir/d/off/lorestan/2021/04/17/3/61901856.jpg",
//     "id":"3"
//   },{
//     "productName":"لباس ورزشی",
//     "price":"12",
//     "number":"7555",
//     "category":"لباس",
//     "image":"https://dkstatics-public.digikala.com/digikala-products/112049597.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_80",
//     "id":"4"
//   },{
//     "productName":"لباس مجلسی",
//     "price":"100",
//     "number":"7555",
//     "category":"لباس",
//     "image":"https://bazmineh.com/files/articles/1609140977-BYVLBCCURH.jpg",
//     "id":"5"
//   },{
//     "productName":"لباس فضا نوردی ناسا",
//     "price":"155",
//     "number":"7555",
//     "category":"لباس",
//     "image":"https://snn.ir/files/fa/news/1399/2/29/1033846_841.jpg",
//     "id":"6"
//   },{
//     "productName":"کفش ورزشی",
//     "price":"511",
//     "number":"7555",
//     "category":"کفش",
//     "image":"https://storage.torob.com/backend-api/base/images/Cv/gy/CvgyKp3UKzBiS4Yh.jpg",
//     "id":"7"
//   },{
//     "productName":"کفش پاشنه بلند",
//     "price":"445",
//     "number":"7555",
//     "category":"کفش",
//     "image":"https://dl.topnaz.com/2018/05/Shoe-4-e1527253694883.jpg",
//     "id":"8"
//   },{
//     "productName":"کفش بوکس",
//     "price":"552",
//     "number":"7555",
//     "category":"کفش",
//     "image":"https://storage.torob.com/backend-api/base/images/Cv/gy/CvgyKp3UKzBiS4Yh.jpg",
//     "id":"9"
//   },{
//     "productName":"موبایل آیفون",
//     "price":"42524",
//     "number":"7555",
//     "category":"موبایل",
//     "image":"https://cdn01.zoomit.ir/2020/10/iphone-12-pro-max-back-front-grey.jpg?w=220",
//     "id":"10"
//   },{
//     "productName":"موبایل سامسونگ",
//     "price":"455542",
//     "number":"7555",
//     "image":"https://dkstatics-public.digikala.com/digikala-products/50859215a683cca636291db77d7617029adee9aa_1597575954.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
//     "category":"موبایل",
//     "id":"11"
//   },{
//     "productName":"موبایل نوکیا",
//     "price":"4454",
//     "number":"7555",
//     "category":"مویابل",
//     "image":"https://cdn.yjc.news/files/fa/news/1399/7/30/12792360_664.jpg"
//     ,"id":"12"
//   },{
//     "productName":"لپتاپ hp",
//     "price":"4546456",
//     "number":"7555",
//     "category":"لپتاپ",
//     "image":"https://cdn01.zoomit.ir/2020/4/7e96f7a6-b0ee-4f56-b456-3d287be353f9.jpg?w=768",
//     "id":"13"
//   },{
//     "productName":"لپتاپ ایسوس",
//     "price":"94994",
//     "number":"7555",
//     "category":"لپتاپ",
//     "image":"https://cdnfa.com/source-computer/f765/files/normal/1934040.jpg",
//     "id":"14"
//   },{
//     "productName":"لپتاپ lenovo",
//     "price":"425254",
//     "number":"7555",
//     "category":"لپتاپ",
//     "image":"https://lipak.com/wp-content/uploads/2020/11/%D9%BE%D9%88%D8%B1%D8%AA-%D9%84%D9%BE%E2%80%8C%D8%AA%D8%A7%D9%BE-%D8%A7%DB%8C%D8%B3%D9%88%D8%B3-R545FB-%E2%80%93-BQ041-510x510.jpg",
//     "id":"15"
//   },{
//     "productName":"هارد 500 گیگ",
//     "price":"5225",
//     "number":"7555",
//     "category":"لوازم جانبی",
//     "image":"https://faststore.ir/wp-content/uploads/2019/03/t4dsuukv.jpg",
//     "id":"16"
//   },{
//     "productName":"فلش 16 گیگ",
//     "price":"4343",
//     "number":"7555",
//     "category":"لوازم جانبی",
//     "image":"https://pishtazrayan.ir/wp-content/uploads/2018/11/HP-v178b-flash-memory-32gb-500x500.jpg",
//     "id":"17"
//   },{
//     "productName":"فلش 23 گیگ",
//     "price":"4565",
//     "number":"7555",
//     "category":"لوازم جانبی",
//     "image":"https://pishtazrayan.ir/wp-content/uploads/2018/11/HP-v178b-flash-memory-32gb-5.jpg",
//     "id":"18"
//   },{
//     "productName":"فلش 64 گیگ",
//     "price":"242424",
//     "number":"7555",
//     "category":"لوازم جانبی",
//     "image":"https://dkstatics-public.digikala.com/digikala-products/170854.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90",
//     "id":"19"
//   },{
//     "productName":"فلش 128 گیگ",
//     "price":"5464564",
//     "number":"7555",
//     "category":"لوازم جانبی",
// "image":"https://teyfcenter.com/news/wp-content/uploads/2020/03/teyfcenter.com-news-USB.Flash_.Memory-2.jpg",
//     ,"id":"20"
//   }
// ],