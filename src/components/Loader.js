/**
 * Summary. A component/provider that displays a loading backdrop and spinning indicator
 *  when a child component dispatches a loading signal.
 *  Supports multiple component loading signal(s) in the case that
 *  multiple async operations need to be waited upon for the same loading screen
 * 
 * Description. This file exports the Component, Provider, and wrapper withLoaderContext.
 *  Usage:
 * 
 *  <LoaderProvider>
 *    <Loader/>
 *    <Component1WrappedWithLoader/>
 *    <Component2WrappedWithLoader>
 *      <Component3WrappedWithLoader/>
 *    </Component2WrappedWithLoader>
 *  </LoaderProvider>
 * 
 *  (this is definitely over-engineered, but learned a great deal about Context API!)
 */

import { Backdrop, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

// Two context are needed for two types of consumers: One "state" consumers (re-renders) and "updater" consumers (no re-rendering)
const LoaderStateContext = React.createContext({}); // Contains the state
const LoaderUpdaterContext = React.createContext({}); // Contains the updater functions

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