import React from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOveriewContainer from '../../components/collections-overview/collections-overview.component';

import CollectionPageContainer from '../collection/collection.container';

class ShopPage extends React.Component {
    
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
        
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
        const {match} = this.props;
        
        return (
            <div className='shop-page'>
                <Route 
                    exact path={`${match.path}`} 
                    component={CollectionsOveriewContainer}  
                />
                
                <Route 
                    exact path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer} 
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);