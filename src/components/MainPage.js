import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import PropTypes from "prop-types";
import { addArticle } from "../actions/index";

// Dispatch action to add to store
const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article))
    };
};

// Form component
class ConnectedForm extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();        
        const { title } = this.state;
        const id = uuidv1();        
        this.props.addArticle({ 
            title, 
            id 
        });
        this.setState({
            title: ""
        })
    }

    render() {
        const { title } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-success btn-lg">
                    SAVE
        </button>
            </form>
        );
    }
}

// Wire it up together and export
const MainPage = connect(null, mapDispatchToProps)(ConnectedForm);

// Check var types using propTypes
ConnectedForm.propTypes = {
     addArticle: PropTypes.func.isRequired
 };

export default MainPage;