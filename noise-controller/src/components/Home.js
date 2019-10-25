// where the actual animals are disappearing and where we are measuring mic sensitivity 
import React, {Component } from 'react';
import { connect } from 'react-redux';
import { deleteAnimal, updateSingleAnimal, toggleShowUpdate } from '../actions';

class Home extends Component {
    handleDeleteAnimal = () => {
        const{ id } = this.props.homeSelected;
        this.props.deleteAnimal(id);
    };

    handleShowAnimal = animal => {
        this.props.updateSingleAnimal(animal);
    };

    toggleShowUpdate = () => {
        this.props.toggleShowUpdate();
    };

    render() {
        return (
            <div className="Animal-Container">
                <ul className="Animal-List">
                    {this.props.animals.map(animal => {
                        return (
                            <li onClick={() =>
                            this.handlerShowAnimal(animal)}
                            key={animal.id}>
                                {animal.name}
                            </li>
                        );
                    })}
                </ul>
                {Object.keys
                (this.props.animalSelected).length > 0 ?(
                    <SelectedAnimal
                        handleShowAnimal={this.handleShowAnimal}
                        toggleShowUpdate={this.toggleShowUpdate}
                        handleDeleteAnimal={this.handleDeleteAnimal}
                        selected={this.props.animalSelected}
                    />
                ) : null}
                {/* {this.props.showUpdate ? (
                    <UpdateSignupForm friend={this.props.animalSelected} />
                ) : null} */}

                {/* //Need to input logo */}
                {this.props.deletingFriend ? (
                    <img src={logo} className="App-logo" alt="logo" />
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
/**Need to include all reducer forms */
    }; 
};

export default connect(mapStateToProps, {
    deleteAnimal,
    updateSingleAnimal,
    toggleShowUpdate,
})(Animals);
