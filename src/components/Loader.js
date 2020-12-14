/**
 * Summary. A LoaderProvider that displays a loading backdrop and spinning indicator.
 * 
 *  Loading displays child component(s) dispatch the loading signal.
 *  Subsequentally, the loader disappears after all children dispatch the loaded signal.
 * 
 * 
 * Description. This file exports the LoaderProvider and the wrapper withLoader.

 *  (this is definitely over-engineered, but learned a great deal about Context API!)
 */

import { Backdrop, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

// Two context are needed for two types of consumers: One "state" consumers (re-renders) and "updater" consumers (no re-rendering)
const LoaderStateContext = React.createContext({}); // Contains state
const LoaderUpdaterContext = React.createContext({}); // Contains functions that update state

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 9999,
        color: '#fff',
        position: "absolute",
    },
});

const Loader = withStyles(styles)(
    class Loader extends React.Component {
        static contextType = LoaderStateContext;
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (
                <Backdrop className={this.props.classes.backdrop} open={this.context} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            );
        }
    });
Loader.propTypes = {};

class LoaderProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingCount: 0,
            isLoading: false,
            updater: {
                signalLoading: this.signalLoading,
                signalLoaded: this.signalLoaded,
            }
        };
    }
    signalLoading = () => {
        this.setState((prevState) => {
            const newCount = prevState.loadingCount + 1
            return {
                ...prevState,
                loadingCount: newCount,
                isLoading: newCount > 0
            }
        });
    }
    signalLoaded = () => {
        this.setState((prevState) => {
            const newCount = (prevState.loadingCount === 0) ? 0 : prevState.loadingCount - 1
            return {
                ...prevState,
                loadingCount: newCount,
                isLoading: newCount > 0
            }
        });
    }

    render() {
        // Nested Providers is necessary to prevent consumer components from re-rendering if they only need to "update" the data.
        return (
            <LoaderUpdaterContext.Provider value={this.state.updater}>
                <LoaderStateContext.Provider value={this.state.isLoading}>
                    <Loader />
                    {this.props.children}
                </LoaderStateContext.Provider>
            </LoaderUpdaterContext.Provider>
        );
    }
};

const withLoader = Component => class Contextual extends React.PureComponent {
    static contextType = LoaderUpdaterContext;
    render() {
        return (
            <Component {...this.props} loader={this.context} />
        )
    }
}

export {
    withLoader
};
export default LoaderProvider;