// where the actual animals are dissapearing and where we are measuring mic sensitivity 
import React, {Component } from 'react';

class Home extends Component {
    handleDeleteAnimal = () => {
        const{ id } = this.props.homeSelected;
        this.props.deleteAnimal(id);
    };


}
