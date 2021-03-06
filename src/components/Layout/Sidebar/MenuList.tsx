import { Component, Emit, Vue, Prop, Watch } from 'vue-property-decorator';
import { routeToArray } from '@/assets/utils';
import { routerItem } from '@/interface';

@Component({
  components: {
  }
})
export default class MenuList extends Vue {
  keys: string[] = [];

  openKeys: string[] = [];

  @Watch('$route', { immediate: true, deep: true })
  routeChange(to: any, from: any) {
    this.keys = routeToArray(to.path).routeArr;
    if (to.meta.parent) {
      // 处理有parent的隐藏子菜单
      this.keys.push(to.meta.parent.path);
    }
    const open = this.keys.concat();
    open.pop();
    this.openKeys = open || [];
  }

  openChange(openKeys: string[]) {
    this.openKeys = openKeys;
  }

  openPage(path: string) {
    this.$router.push(path);
  }

  menuClick(params: { item: any; key: string; keyPath: string[] }) {
    const keyPath = params.keyPath.reverse();
    this.openPage(keyPath.join('/'));
  }

  render() {
    let {
      menuData,
      sidebar: { opened }
    } = this.$store.state.app;
    return (
      <a-menu
        inlineCollapsed={!opened}
        theme="dark"
        mode="inline"
        class="left-menu"
        openKeys={this.openKeys}
        on-openChange={this.openChange}
        selectedKeys={this.keys}
        on-click={this.menuClick}
      >
        {menuData ? this.renderMenu(menuData) : null}
      </a-menu>
    );
  }

  renderMenu(
    menuData: routerItem[],
    parentPath?: string
  ): (JSX.Element | null)[] {
    return menuData.map((item: routerItem) => {
      if (item.children) {
        let isEmpty = true;
        item.children.forEach((items: routerItem) => {
          if (!items.hidden) {
            isEmpty = false;
          }
        });
        if (isEmpty) {
          return (
            <a-menu-item id={item.path} key={`${item.path}`}>
              <a-icon type={item.icon} />
              <span>{item.meta.name}</span>
            </a-menu-item>
          );
        }
        return (
          <a-submenu id={item.path} key={item.path}>
            <template slot="title">
              <a-icon type={item.icon} />
              <span>{item.meta.name}</span>
            </template>
            {this.renderMenu(
              item.children,
              parentPath ? `${parentPath}/${item.path}` : item.path
            )}
          </a-submenu>
        );
      }
      if (item.hidden) {
        return null;
      }
      return (
        <a-menu-item id={item.path} key={`${item.path}`}>
          {item.icon ? <a-icon type={item.icon} /> : ''}
          <span>{item.meta.name}</span>
        </a-menu-item>
      );
    });
  }
}
