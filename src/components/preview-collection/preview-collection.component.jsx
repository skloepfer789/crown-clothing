import React from 'react';
import { Link } from 'react-router-dom';
import './preview-collection.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({title, items, routeName}) => (
    <div className='collection-preview'>
        <Link to={`shop/${routeName}`}><h1 className='title'>{title.toUpperCase()}</h1></Link>
        <div className='preview'>
            {
                //idx is index
                items
                .filter((item, idx) => idx < 4 )
                .map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;