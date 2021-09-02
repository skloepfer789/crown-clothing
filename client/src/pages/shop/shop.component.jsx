import React, {useEffect, lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const CollectionsOveriewContainer = lazy(() => import('../../components/collections-overview/collections-overview.component'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));

const ShopPage = ({ match, fetchCollectionsStart}) => {

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]);
    
    return (
            <Suspense fallback={<Spinner />} >
                <Route 
                    exact path={`${match.path}`} 
                    component={CollectionsOveriewContainer}  
                />
                
                <Route 
                    exact path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer} 
                />            
            </Suspense>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);