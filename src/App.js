import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Catalog from './components/catalog/Catalog';
import { apiSionic } from './api/api';
import { addCategory } from './redux/models/Category';
import { category } from './redux/orm/selectors';
import Preloader from './components/commons/Preloader';
import { setErrorApp, setInitialApp } from './redux/appSlice';
import { addProductVariationProperties } from './redux/models/ProductVariationProperty';
import { addProductVariationPropertyListValues } from './redux/models/ProductVariationPropertyListValue';
import Basket from './components/basket/Basket';
import Delivery from './components/delivery/Delivery';
import ListVariations from './components/catalog/listVariations/ListVariations';
import Order from './components/order/Order';
import Error from './components/commons/error/Error';


function App() {
  const orm = useSelector(state => state.orm);
  const dispatch = useDispatch();
  const listVarioations = useSelector(state => state.app.listVariation);
  const initialApp = useSelector(state => state.app.initialApp);
  const idCategory = useSelector(state => state.app.idCategory);
  const categories = useSelector(state => category(state));
  const errorApp = useSelector(state => state.app.errorApp);

  useEffect(() => {
    satrtApp();
  }, []);

  async function satrtApp() {
    try {
      let categories = await apiSionic.getCategories();
      let productVariationProperties = await apiSionic.getProductVariationProperties();
      let ProductVariationPropertyListValues = await apiSionic.getProductVariationPropertyListValues();
      Promise.all([categories, productVariationProperties, ProductVariationPropertyListValues]).
        then(values => {
          dispatch(addCategory(values[0]));
          dispatch(addProductVariationProperties(values[1]));
          dispatch(addProductVariationPropertyListValues(values[2]));
        }).catch(err => { throw err })
      dispatch(setInitialApp());
    } catch (e) {
      dispatch(setErrorApp('Нет связи с сервером...'));
    }
  }
  return (
    <div className="App" >
      {listVarioations ? <ListVariations listVarioations={listVarioations} /> : null}
      <Routes>
        <Route element={<Layout />}>
          <Route path='/'
            element={initialApp ?
              <Catalog categories={categories}
                idCategory={idCategory} /> : errorApp ? <Error text={errorApp} /> : <Preloader max text="Загружаем..." />} />
          <Route path='basket' element={<Basket />} />
          <Route path='delivery' element={<Delivery />} />
          <Route path='orders' element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
