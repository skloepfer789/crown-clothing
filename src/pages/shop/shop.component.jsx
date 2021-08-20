import React from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import CollectionsOveriew from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOveriew);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
        
        /*

        OUR DATA FETCHING HAS MOVED TO SHOP ACTIONS

        - FETCH, use this, then structure like the "get" version. However, with Firebase the data is so nested it's a massive pain in the ass to access. So stick with Get or CollectionRef

        fetch('https://firestore.googleapis.com/v1/projects/crown-db-8e0f9/databases/(default)/documents/collections')
            .then(response => response.json())
            .then(collections => console.log(collections)); 

        
        - GET version, traditional call to DB w/out firestore calls. Problem is, it doesn't continually listen. This is final version we're going to use. Original version below

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionShapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });


        - USING firestore calls, continual data flow

        this.unsubscribeFromShapShot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionShapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });

        */
    }
    
    render (){
        const {match, isCollectionFetching, isCollectionLoaded} = this.props;
        
        return (
            <div className='shop-page'>
                <Route 
                    exact path={`${match.path}`} 
                    render={(props) => (
                        <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
                    )} 
                />
                
                <Route 
                    exact path={`${match.path}/:collectionId`} 
                    render={(props) => (
                        <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                        //has to invert. If collection IS NOT loaded, then render spinner
                    )} 
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);