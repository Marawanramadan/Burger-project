import {configure,shallow} from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({
    adapter : new Adapter()
})

describe('Navigation Items',()=>{
    it('should have two navigationItem components',()=>{
        const wrapper = shallow(<NavigationItems></NavigationItems>)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    describe('Navigation Items',()=>{
        it('should have three navigationItem components',()=>{
            const wrapper = shallow(<NavigationItems isAuth={true}></NavigationItems>)
            expect(wrapper.find(NavigationItem)).toHaveLength(3)
        })

    
})
})