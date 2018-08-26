import React from 'react';
import InlineEditableText from '../InlineEditableText';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

configure({adapter: new Adapter()});

describe('InlineEditableText', () => {
    const props = {
        text: 'some test text',
        id: 1,
        onEditComplete: jest.fn()
    }

    afterEach(() => {
        props.onEditComplete.mockClear();
    });
    
    it('renders a div with text initially', () => {
        const wrapper = shallow(<InlineEditableText {...props}/>)
        expect(wrapper.props().children).toEqual('some test text');
    });

    it('renders a text input when onClick has been dispatched', () => {
        const wrapper = shallow(<InlineEditableText {...props}/>);
        wrapper.props().onClick();
        expect(wrapper.props().type).toEqual('text')
    });

    it('calls provided callback onBlur with new value', () => {
        const wrapper = shallow(<InlineEditableText {...props}/>);
        
        wrapper.props().onClick();
        wrapper.props().onBlur({target: {value: 'new value'}});

        expect(props.onEditComplete).toHaveBeenCalledTimes(1)
        expect(props.onEditComplete.mock.calls[0][0]).toEqual({newText:'new value', id:1})
    });
    
    it('calls provided callback onKey for enter key with new value', () => {
        const wrapper = shallow(<InlineEditableText {...props}/>);
        
        wrapper.props().onClick();
        wrapper.props().onKeyUp({keyCode: 13, target: {value: 'new value'}});

        expect(props.onEditComplete).toHaveBeenCalledTimes(1)
        expect(props.onEditComplete.mock.calls[0][0]).toEqual({newText:'new value', id:1})
    });

    it('does not call provided callback onKey for non-enter key', () => {
        const wrapper = shallow(<InlineEditableText {...props}/>);
        
        wrapper.props().onClick();
        wrapper.props().onKeyUp({keyCode: 1, target: {value: 'new value'}});

        expect(props.onEditComplete).toHaveBeenCalledTimes(0)
    });
});