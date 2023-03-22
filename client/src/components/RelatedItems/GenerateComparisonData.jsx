// import { useSelector, useDispatch } from 'react-redux';
// import { newCombinedProductFeatures } from '../../features/related/relatedSlice';

// function GenerateComparisonData() {
//   let { relatedProductFeatures } = useSelector((state) => state.related);
//   let { details } = useSelector((state) => state.products);
//   const dispatch = useDispatch();

//   const combinedData = {};
//   const relatedProductDetails = relatedProductFeatures;
//   const currentProductDetails = details.features;

//   relatedProductDetails.forEach((char) => {
//     const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
//     combinedData[description] = { related: true, current: false };
//   });
//   currentProductDetails.forEach((char) => {
//     const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
//     if (combinedData[description]) {
//       combinedData[description].current = true;
//     } else {
//       combinedData[description] = { related: false, current: true };
//     }
//   });
//   dispatch(newCombinedProductFeatures(combinedData));
//   console.log('combinedData: ', combinedData);
//   console.log('relatedProductFeatures: ', relatedProductFeatures);
//   console.log('details.features: ', details.features);
// }

// export default GenerateComparisonData;
