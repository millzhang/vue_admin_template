/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-07-10 10:24:04
 *@description:  Tabel Common组件
 */
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { ColumnFilterItem, Column } from "ant-design-vue/types/table/column.d";
import Service from "@/service";

export interface ColumnFormatter {
  title: string;
  dataIndex?: string;
  width?: number;
  customRender?: Function;
  scopedSlots?: object;
  filters?: Array<ColumnFilterItem>;
  onFilter?: Function;
  sorter?: Function;
  filterMultiple?: boolean;
  render?: Function;
}

@Component({
  name: "MilkTable",
  components: {}
})
export default class MilkTable extends Vue {
  /**
   * 表格列配置项
   */
  @Prop()
  private columns!: any[];

  /**
   * 分页大小配置
   */
  @Prop({ default: 20, type: Number })
  private pageSize!: number;

  /**
   * 接口服务名称
   */
  @Prop({ default: "", type: String })
  private serviceName!: string;

  @Prop({ default: false, type: Boolean })
  private show!: boolean;

  private selectedRowKeys: any[] = [];

  /**
   * 分页配置项
   */
  @Prop({
    default: () => ({
      current: 1,
      pageSize: 10,
      total: 0,
      showQuickJumper: true,
      showSizeChanger: true,
      position: "bottom",
      showTotal: (total: any, range: any[]) => {
        return `共计${total}条记录`;
      }
    }),
    type: Object
  })
  private pagination!: any | boolean;

  private tableData: any[] = [{}];

  private loading: Boolean = false;

  created() {}

  @Emit()
  handleTabelChange(pagination: any, filters: any, sorter: any) {
    this.pagination.current = pagination.current;
    this.pagination.pageSize = pagination.pageSize;
    this.$emit("pageChange");
  }

  @Emit()
  rowsChange(selectedRowKeys: string[], rows: any[]) {
    this.selectedRowKeys = selectedRowKeys;
    this.$emit("rowChange", rows);
  }

  @Emit()
  public fetchData(queryData: any) {
    if (!this.serviceName) return;
    this.loading = true;
    (Service as any)
      [this.serviceName]({
        ...queryData,
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      })
      .then((res: any) => {
        this.loading = false;
        this.tableData = res.data.list;
        this.pagination.total = Number(res.data.total);
        this.selectedRowKeys = [];
        this.$emit("rowChange", []);
        this.$emit("loaded");
      })
      .catch(() => {
        this.loading = false;
      });
  }

  /**
   * 自定义渲染列
   */
  renderCustomSlots() {
    let slots = Object.create(null);
    this.columns.map((item: any) => {
      if (item.scopedSlots) {
        slots[item.scopedSlots.customRender] = (options: any) => {
          return item.render(options);
        };
      }
    });
    return slots;
  }

  render() {
    const rowSelection: object = {
      onChange: this.rowsChange,
      selectedRowKeys: this.selectedRowKeys,
      getCheckboxProps: (record: any) => {
        return {
          props: {
            checked: false,
            defaultChecked: false
          }
        };
      }
    };
    return (
      <a-table
        style="margin-top:20px;"
        rowKey={(record: any) => record.id}
        bordered
        scroll={{ x: 100, y: 200 }}
        columns={this.columns}
        dataSource={this.tableData}
        pagination={this.pagination}
        loading={this.loading}
        rowSelection={rowSelection}
        on-change={this.handleTabelChange}
        scopedSlots={this.renderCustomSlots()}
      />
    );
  }
}
