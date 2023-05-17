import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../hooks";
import {genreActions} from "../redux";
import {AllFilm} from "../components";
import './AllFilmsPage.css'
import '../components/AllFilms/allFilm.css'

const MoviesByGenre = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {moviesByGenre,page} = useAppSelector(state => state.genre);
    const {pathname} = location
    const id = pathname.split('/').splice(1,2).toString()
    useEffect(()=>{
        dispatch(genreActions.findByGenre({id,page}))
    },[dispatch,pathname,page])
    return (
        <div className={'mainWrapper'}>
            <div className={'wrapperAllMovies'}>
                {
                    moviesByGenre.map(value => <AllFilm results={value} key={value.id}/>)
                }

            </div>
            <div className={'pagination'}>
                <button className={'button'} disabled={page<=1} onClick={()=>dispatch(genreActions.dec())}>Prev Page</button>
                <p className={'count'}>{page}</p>
                <button className={'button'}  onClick={()=> dispatch(genreActions.inc())}>Next Page</button>
            </div>

        </div>
    );
};

export {MoviesByGenre};