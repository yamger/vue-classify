import {Button, Select, Container, Header, Main, Footer, Input, Form, FormItem, Row, Col, Card} from 'element-ui';
import {Link, Menu, MenuItem, Submenu, Aside, DatePicker} from 'element-ui';
import {Table, TableColumn, Loading, Pagination, Alert, Cascader,Dropdown,DropdownItem,DropdownMenu,Tabs,TabPane} from 'element-ui';
import {Upload,Switch,Option} from 'element-ui';
import Vcharts from 'v-charts';

const element = {
    install(Vue) {
        Vue.use(Button);
        Vue.use(Select);
        Vue.use(Container);
        Vue.use(Header);
        Vue.use(Main);
        Vue.use(Footer);
        Vue.use(Input);
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(Card);
        Vue.use(Link);
        Vue.use(Menu);
        Vue.use(MenuItem);
        Vue.use(Submenu);
        Vue.use(Aside);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Loading);
        Vue.use(Pagination);
        Vue.use(Alert);
        Vue.use(Cascader);
        Vue.use(DatePicker);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Tabs);
        Vue.use(TabPane);
        Vue.use(Upload);
        Vue.use(Vcharts);
        Vue.use(Switch);
        Vue.use(Option);
    }
};
export default element;
