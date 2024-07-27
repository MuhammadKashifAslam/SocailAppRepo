import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "./colors";


const DrawerScreenOption:DrawerNavigationOptions={
    headerShown:false,
    drawerStyle:{
        width:responsiveWidth(60),
        backgroundColor:colors?.RebeccaPurple,
        borderColor:colors?.gray
    }
}


const DrawerOption=[
    'Home',
    'Setting',
    'Chat',
    'Notification',
    'Logout'
]


const getAllProducts=[
    {
        id:1,
        name:'shoes',
        price:'200$',
        receiptno:'2345423',
        refund:'No',
        imageurl:'https://trex.com.pk/uploads/trex/tLC0IgGTRYQ4P0wdOo2d97gdH6S0iPucavRTMFru.jpg',
        status:'inProgress',
        categories:'sports',
        taxStatus:'payable'
    },
    {
        id:2,
        name:'Red Womens Sports Shoes',
        price:'250$',
        receiptno:'2345423',
        refund:'No',
        imageurl:'https://trex.com.pk/uploads/trex/E2rzBwUDgRxXH19YPNkWPBAXj83sOqJ01iljg5zs.jpg',
        status:'inProgress',
        categories:'sports',
        taxStatus:'payable'
    },
    {
        id:3,
        name:'Sneakers Mens',
        price:'250$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://giovannifootwear.com/wp-content/uploads/2020/10/product-image-1452836723-247x296.jpg',
        status:'inProgress',
        categories:'sports',
        taxStatus:'payable'
    },
    {
        id:4,
        name:'T-Shirts',
        price:'250$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://img.freepik.com/premium-photo/men-s-blank-tshirt-mockup-design_521057-9807.jpg',
        status:'inProgress',
        categories:'shirts',
        taxStatus:'payable'
    },
    {
        id:5,
        name:'Women T-Shirts',
        price:'200$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://pk.sapphireonline.pk/cdn/shop/files/SLEPTOP00262_4.jpg?v=1715176704&width=1024',
        status:'inProgress',
        categories:'shirts',
        taxStatus:'payable'
    },
    {
        id:6,
        name:'Women T-Shirts',
        price:'200$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://www.uniquefitness.pk/cdn/shop/products/Article120_4_800x.jpg?v=1681937908',
        status:'inProgress',
        categories:'shirts',
        taxStatus:'payable'
    },
    {
        id:7,
        name:'Casual Pants for Boys',
        price:'120$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://m.media-amazon.com/images/I/71NswMePZZL._AC_UY1000_.jpg',
        status:'inProgress',
        categories:'pants',
        taxStatus:'payable'
    },
    {
        id:8,
        name:'Mens Denim',
        price:'120$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2PH-M4W6jSyOrbBFhAYHafdI7Bin6WZfoPQ&s',
        status:'inProgress',
        categories:'pants',
        taxStatus:'payable'
    },
    {
        id:9,
        name:'Mens Denim',
        price:'120$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://assets.ajio.com/medias/sys_master/root/20220114/nYif/61e092fcf997dd662320f023/-473Wx593H-463656930-pink-MODEL.jpg',
        status:'inProgress',
        categories:'pants',
        taxStatus:'payable'
    },
    {
        id:10,
        name:'Mens Denim',
        price:'120$',
        receiptno:'2345f23',
        refund:'No',
        imageurl:'https://wallpapers.com/images/hd/fashionable-style-denim-jeans-ck0o0m48mj5sqpgt.jpg',
        status:'inProgress',
        categories:'pants',
        taxStatus:'payable'
    }
]


export {
    DrawerScreenOption,
    DrawerOption,
    getAllProducts
}