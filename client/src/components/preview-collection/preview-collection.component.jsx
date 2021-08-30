import React from 'react';
import { withRouter } from 'react-router-dom';
import './preview-collection.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

import {CollectionPreviewContainer, TitleContainer, PreviewContainer} from './preview-collection.styles';

const CollectionPreview = ({title, items, routeName, history, match}) => (
    <CollectionPreviewContainer>
        <TitleContainer 
            onClick={() => 
                history.push(`${match.path}/${routeName}`)}
        >
            {title.toUpperCase()}
        </TitleContainer>
        <PreviewContainer>
            {
                //idx is index
                items
                .filter((item, idx) => idx < 4 )
                .map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </PreviewContainer>
    </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);