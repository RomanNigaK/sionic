import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIdCategoryThunk } from "../../../redux/appSlice";
import s from './catalog.module.css';
const Categories = (props) => {
    const dispatch = useDispatch();
    const idCategory = useSelector(state => state.app.idCategory);

    function choiseCategory(id) {
        console.log(id)
        dispatch(setIdCategoryThunk(id));
    }

    let mapStyleCategories = {
        0: s.btnbtncategory1,
        1: s.btnbtncategory2,
        2: s.btnbtncategory3,
        3: s.btnbtncategory4,
        4: s.btnbtncategory1,
        5: s.btnbtncategory2,
        6: s.btnbtncategory3,
        7: s.btnbtncategory4,
        8: s.btnbtncategory2,
        9: s.btnbtncategory3,
        10: s.btnbtncategory4,
        0: s.btnbtncategory5,
    }
    let listCategories = props.categories.map(el => {


        return <div className={s.btncategory + ' ' + mapStyleCategories[el.id == idCategory ? 0 : el.id]} key={'categoty' + el.id}
            onClick={() => choiseCategory(el.id)}>
            {el.name}
        </div>
    });
    return (
        <>
            {listCategories}
        </>
    )
};
export default Categories;