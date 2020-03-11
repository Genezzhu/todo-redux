import React, {Component} from 'react';
import { connect } from 'react-redux';
import { clearCompleted, updateFilter } from '../actions'


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filters : [
                {id:1, filterName: 'All'},
                {id:2, filterName: 'Active'},
                {id:3, filterName: 'Completed'},
            ],
        };
    }

    clearCompleted = () => {
        const { clearCompleted } = this.props;
        clearCompleted();
    };

    filterSelection = (filter) => {
        let classNameStr = '';
        if (filter.filterName === this.props.filter) {
            classNameStr += 'selected';
            return classNameStr;
        }else {
            return classNameStr;
        }
    };

    filterHandler = (e, filter) => {
        e.preventDefault();
        const { updateFilter } = this.props;
        updateFilter({
            filter: filter.filterName
        });
    };

    renderFilterList () {
        let { filters } = this.state;
        return filters.map(filter => {
            return (
                <li key={filter.id}>
                    <a className={this.filterSelection(filter)}
                       href="/"
                       onClick={e => this.filterHandler(e, filter)}
                    >{filter.filterName}</a>
                </li>
            );
        });
    }

    render() {
        const { showClearButton, remainingItems } = this.props;
        return (
            <React.Fragment>
                {/*This should be `0 items left` by default */}
                <span className="todo-count">
                            <strong>
                                {remainingItems}
                            </strong> item left</span>
                {/*Remove this if you don't implement routing*/}
                <ul className="filters">
                    {this.renderFilterList()}
                </ul>
                {/*Hidden if no completed items are left ↓*/}
                {showClearButton &&
                <button className="clear-completed"
                        onClick={this.clearCompleted}
                >Clear completed</button>}
            </React.Fragment>
        );
    }
}

function mapStatesToProps (state) {
    const {todo} = state;
    return {
        showClearButton: todo.showClearButton,
        remainingItems: todo.remainingItems,
        filter: todo.filter,
    };
}

const mapDispatchToProps = {
    clearCompleted,
    updateFilter,
};

export default connect(mapStatesToProps, mapDispatchToProps)(Footer);