// import { useSelector, useDispatch } from 'react-redux';
// import { newCombinedProductFeatures } from '../../features/related/relatedSlice';

// function GenerateComparisonData(currentProductFeatures) {
//   let { modalOpen, relatedProductFeatures, combinedProductFeatures } = useSelector((state) => state.related);
//   let { details } = useSelector((state) => state.products);
//   const dispatch = useDispatch();
//   const combinedData = [];
//   const relatedProductDetails = relatedProductFeatures;
//   const currentProductDetails = details.features;
//   relatedProductDetails.forEach((char) => {
//     const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
//     combinedData.push({ value: description, related: true, current: false });
//   });
//   currentProductDetails.forEach((char) => {
//     const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
//     let hasCharacteristic = false;
//     combinedData.forEach((existingChar) => {
//       if (existingChar.value === description) {
//         existingChar.current = true;
//         hasCharacteristic = true;
//       }
//     });
//     if (!hasCharacteristic) { combinedData.push({ value: description, related: false, current: true }); }
//   });
//   // console.log('combinedData: ', combinedData);
//   dispatch(newCombinedProductFeatures(combinedData));
//   return null;
// }

// export default GenerateComparisonData();
