
import { Fade } from '@mui/material';
import React, { ReactElement } from 'react';

interface FadeIntoViewProps {
    children: ReactElement<any, any>;
}

interface FadeIntoViewState {
    isVisible: boolean;
    domRef: React.RefObject<Element>;
    observer: IntersectionObserver;
}

class FadeIntoView extends React.Component<FadeIntoViewProps, FadeIntoViewState> {
    constructor(props: FadeIntoViewProps) {
        super(props);
        this.state = {
            isVisible: false,
            domRef: React.createRef(),
            observer: new IntersectionObserver(entries => {
                entries.forEach(entry => this.setState({ isVisible: entry.isIntersecting }))
            })
        };
    }

    componentDidMount() {
        if(this.state.domRef.current) {
            this.state.observer.observe(this.state.domRef.current!);
            return () => this.state.observer.unobserve(this.state.domRef.current!);
        }
    }
    componentWillUnmount() {
        if(this.state.domRef.current) {
            this.state.observer.unobserve(this.state.domRef.current!);
        }
    }
    render() {
        return (
            <Fade ref={this.state.domRef} in={this.state.isVisible} timeout={3000}>{this.props.children}</Fade>
        );
    }
}

export default FadeIntoView;