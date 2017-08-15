/**
 *  TabBar
 */
'use strict'

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import React, {Component} from 'react'

import TabBarItem from './TabBarItem';
import   {colors, fonts, urls, sizes} from '../common/commondata';

export default class TabBar extends Component {
    static Item = TabBarItem;

    static defaultProps = {
        defaultPage: 0,
        navFontSize: 8.5,
        navTextColor: colors.text_not_impor,
        navTextColorSelected: colors.main,
    };

    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
        defaultPage: React.PropTypes.number,
        navFontSize: React.PropTypes.number,
        navTextColor: React.PropTypes.string,
        navTextColorSelected: React.PropTypes.string,
        onItemSelected: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.visibles = [];
        this.state = {
            selectedIndex: 0,
        }

    }

    getBadge(child) {
        let value = 0;
        var  _badgeStyle;
        if (typeof child.props.badge == 'number') {
            value = child.props.badge;
            if(value>99){
                value=99;
            }
            if(value>9){
                _badgeStyle=styles.badgeWithTwoNumber;

            }else{
                _badgeStyle=styles.badgeWithOneNumber;

            }
        }else {
            value=child.props.badge;
            if(value==undefined){
                _badgeStyle=styles.badgeNone;
            }else{
                _badgeStyle=styles.badgeNoNumber;
            }
            value="";
        }


            return (
                <View style={[_badgeStyle]}>
                    <Text style={styles.badgeText}>{value.toString()}</Text>
                </View>
            );

    }

    //放大按钮
    _stressPoint(child){
        return child.props.point;
    }

    render() {
        let children = this.props.children;
        if (!children.length) {
            throw new Error("at least two child component are needed.");
        }
        // 底部tab按钮组
        let navs = [];
        const contentViews = children.map(
            (child, i) => {
                if(!child){
                    return <View   key={i}></View>
                }

                const icon = this.state.selectedIndex == i ? child.props.selectedIcon : child.props.icon;
                const color = this.state.selectedIndex == i ? this.props.navTextColorSelected : this.props.navTextColor;

                navs[i] = (
                    <TouchableHighlight
                        key={i}
                        underlayColor={'transparent'}
                        style={styles.navItem}
                        onPress={() => {

                                if (child.props.onPress) {
                                    child.props.onPress();
                                }
                                this.update(i);
                        }}>
                        <View style={styles.center}>
                            {icon}

                            <Text style={[styles.navText, {color: color, fontSize: this.props.navFontSize}]}>
                                {child.props.title}
                            </Text>

                             {this.getBadge(child)}

                        </View>
                    </TouchableHighlight>
                );

                if (!this.visibles[i]) {
                    return (<View key={'view_' + i}
                    ></View>);
                } else {
                    const style = this.state.selectedIndex === i ? styles.base : [styles.base, styles.gone];
                    return (
                        <View
                            key={'view_' + i}
                            style={style}>
                            {child}
                        </View>
                    );
                }
            }
        );

        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.content}>
                    {contentViews}
                </View>

                <View style={styles.horizonLine}/>

                <View style={styles.nav}>
                    {navs}
                </View>
            </View>
        );
    }

    componentDidMount(){
        let page = this.props.defaultPage;
        if (page >= this.props.children.length || page < 0) {
            page = 0;
        }
        this.update(page);
    }

    update(index) {
            this.visibles[index] = true;
            this.setState({
                selectedIndex: index,
            });

            if (this.props.onItemSelected) {
                this.props.onItemSelected(index);
            }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        overflow: 'hidden',

    },
    content: {
        flex: 1
    },
    base: {
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    gone: {
        top: Dimensions.get('window').height,
        bottom: -Dimensions.get('window').height,
    },
    nav: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        backgroundColor:colors.white,
    },
    navItem: {
        flex: 1,
        paddingTop: 3,
        paddingBottom: 3,
        alignItems: 'center',
    },
    center: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navImage: {
        width: 24,
        height: 24,
        marginBottom: 2,
    },
    navImageChange: {
        top: -28,
        width: 56,
        height: 56,
        marginBottom: 2,
        position: 'absolute',
        borderRadius: 28,
        borderWidth: 3,
        borderColor: '#fff',
        alignSelf: 'center'
    },
    navTextChange: {
        marginTop: 30,
        fontSize: 10,
        alignSelf: 'center'
    },
    navText: {
        marginTop: 2,
        alignSelf: 'center',
    },
    horizonLine: {
        backgroundColor: colors.divider,
        height: 0.5,
        width: Dimensions.get('window').width,
    },
    /*badgeNoNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: -2,
        left: 36,
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#ffffff',
        backgroundColor: '#ff0000',
    },*/
    badgeNoNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 5,
        left: 36,
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        backgroundColor: colors.error,
    },
    badgeNone: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 5,
        left: 36,
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        backgroundColor: "transparent",
    },
    badgeWithTwoNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 0,
        left: 30,
        position: 'absolute',
        width: 22,
        height: 18,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ffffff',
        backgroundColor:colors.error,
    },
    badgeWithOneNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 0,
        left: 30,
        position: 'absolute',
        width: 18,
        height: 18,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ffffff',
        backgroundColor:colors.error,
    },
    badgeText:{
        alignSelf: 'center',
        fontSize: 10,
        color: colors.white,
        backgroundColor: 'transparent',
    },
});
