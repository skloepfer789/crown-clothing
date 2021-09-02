import React from 'react';

import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText} from './error-boundary.styles';

//wraps components, and if any error is thrown, we process it and DO something with it. Then return an object
class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    // this method just gives error. This method catches error AHEAD of time.
    static getDerivedStateFromError(error){
        return { hasErrored: true };
    }

    //this method has the info attached to error as well. you can email error, or console log it.
    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if(this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/QIxIKBH.png' />
                    <ErrorImageText>
                        This Page is a Ghost
                    </ErrorImageText>
                    <p>Once alive and now dead, this ghost appears to have some unfinished business. Could it be with you? Or the treasure hidden under the<br/> floorboards of the old mansion in the hills that may never reach its rightful owner, a compassionate school teacher in Brooklyn.</p>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;