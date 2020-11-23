import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class ErrorPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            hasError: false 
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if(this.state.hasError) {
            return (
                <> 
                    <h1>Oops!! Something Went Wrong. Please go back to try again!!</h1>
                    <button><a href = "/" style ={{color: "#000000"}}>Go Back</a></button>
                </>
            )
        }
        return this.props.children 
    }
}

ErrorPage.propTypes = {
    error: PropTypes.bool
}