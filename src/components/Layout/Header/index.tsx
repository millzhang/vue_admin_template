import { Component, Prop, Emit, Vue, Watch } from 'vue-property-decorator';
import {
  Badge,
  Dropdown,
  Breadcrumb,
  Popover,
  Icon,
  Menu
} from 'ant-design-vue';
import { routeToArray } from '@/assets/utils';
import { routerItem } from '@/interface';
import { userToken } from '@/assets/utils';
import PowerIcon from '@/assets/icons/power.svg';

interface breadItem {
  url: string;
  text: string;
}

@Component({
  components: {
    'a-badge': Badge,
    'a-dropdown': Dropdown,
    'a-menu-item': Menu.Item,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-popover': Popover,
    'a-icon': Icon,
    'a-menu-divider': Menu.Divider,
    'a-menu': Menu
  }
})
export default class Header extends Vue {
  // data
  menuData: routerItem[] = [];

  breadList: breadItem[] = [];

  onIndex: number = 0;

  now: string = '';

  @Watch('$route', { immediate: true, deep: true })
  routeChange(to: any, from: any) {
    const toDepth = routeToArray(to.path);
    this.onIndex = 0;
    this.breadList = [];
    this.routerBread(this.menuData, toDepth.routeArr);
  }

  @Watch('menuData')
  initRouteBread() {
    const toDepth = routeToArray(this.$route.path);
    this.routerBread(this.menuData, toDepth.routeArr);
  }

  @Emit()
  routerBread(data: routerItem[], toDepth: string[]) {
    data.map((item: routerItem) => {
      if (item.path === toDepth[this.onIndex]) {
        if (item.meta && item.meta.parent) {
          // 含有parent先push parent
          this.breadList.push({
            url: item.meta.parent.path,
            text: item.meta.parent.name ? item.meta.parent.name : ''
          });
        }
        this.breadList.push({
          url: item.path,
          text: item.meta.name ? item.meta.name : ''
        });
        if (item.children && toDepth.length - 1 >= this.onIndex) {
          this.onIndex += 1;
          this.routerBread(item.children, toDepth);
        }
      }
      return true;
    });
  }

  @Emit()
  switchSidebar(): void {
    //切换侧边栏
    this.$store.dispatch('ToggleSideBar');
  }
  @Emit()
  handleLogout(): void {
    this.$confirm({
      title: '温馨提示',
      content: '您是否确认退出系统？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.$utils.userToken().remove();
        this.$router.push('/login');
      }
    });
  }
  getNowTime() {
    let timer = setInterval(() => {
      this.now = this.$utils.parseDate(new Date());
    }, 1000);
  }
  render() {
    const {
      menuData,
      sidebar: { opened },
      isMobile
    } = this.$store.state.app;
    this.menuData = menuData;
    this.getNowTime();
    return (
      <header class="header-wrap">
        <div class="header-left">
          <i
            class={`menu-btn iconfont-${opened ? 'indent' : 'outdent'}`}
            on-click={this.switchSidebar}
          />
          <a-breadcrumb class="header-bread" separator="/">
            {this.breadList.map((item: breadItem) => (
              <a-breadcrumb-item>
                <router-link to={item.url ? item.url : null}>
                  {item.text}
                </router-link>
              </a-breadcrumb-item>
            ))}
          </a-breadcrumb>
        </div>
        <ul class="header-menu">
          <li class="user">
            <a-icon type="user" />
            <div class="info">
              <span class="name">欢迎您，admin</span>
              <span class="time">{this.now}</span>
            </div>
          </li>
          <li class="logout" on-click={this.handleLogout}>
            <a-icon component={PowerIcon} />
            <span style="margin-left:5px;">安全退出</span>
          </li>
        </ul>
      </header>
    );
  }
}
