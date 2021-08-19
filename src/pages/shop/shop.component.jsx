import React from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionShapshotToMap } from '../../firebase/firebase.utilis';
import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOveriew from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOveriew);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {loading: true};
    unsubscribeFromSnapshot = null;
    
    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromShapShot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionShapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }
    
    render (){
        const {match} = this.props;
        const{loading} = this.state;
        
        return (
            <div className='shop-page'>
                <Route 
                    exact path={`${match.path}`} 
                    render={(props) => (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )} 
                />
                
                <Route 
                    exact path={`${match.path}/:collectionId`} 
                    render={(props) => (
                        <CollectionPageWithSpinner isLoading={loading} {...props} />
                    )} 
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);