/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-27 16:31:28
 *@description: 通用的表单组件封装
 */
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import {
  Form
} from 'ant-design-vue';
import moment from 'moment';

export interface Col {
  labelCol?: object;
  wrapperCol?: object;
}

export interface FormLayoutSlot {
  form?: string;
  item?: Col;
  button?: Col;
}

/**
 * 通用表单的数据插槽
 */
export interface FormDataSlot {
  /**
   * Label
   * @description form表单label标签
   * @default ""
   * @type string
   */
  label: string;

  /**
   * Key
   * @description form表单输入框model值
   * @default ""
   * @type string
   */
  key: string;

  /**
   * Editable
   * @description form表单输入框是否可编辑
   * @default true
   * @type boolean
   */
  editable?: boolean;

  /**
   * Width
   * @description form表单输入框的宽度
   * @default ""
   * @type string
   */
  width?: string;

  /**
   * Type
   * @description form表单类型
   * @value text|select|datepicker|radio|checkbox|timepicker
   * @type string
   */
  type: string;

  /**
   * Init
   * @description 值域的初始值
   * @default ""
   * @type string
   */
  init?: any;

  /**
   * Rule
   * 不填按常用的必填规则
   * @description 校验规则
   * @default []
   * @type array
   */
  rule?: object[];

  /**
   * Validator
   * 自定义校验规则
   * @description 校验规则
   * @default ''
   * @type string
   */
  validator?: string;

  /**
   * ValidatorCompare
   * 自定义比较校验规则
   * @description 校验规则
   * @default ''
   * @type string
   */
  validatorCompare?: object;

  /**
   * ValidateMessage
   * 校验信息
   * @description 校验信息
   * @default ''
   * @type string
   */
  validateMessage?: string;

  /**
   * Options
   * 选择列表渲染数据
   * @description 该项需要渲染的数据列表
   * @default []
   * @type array
   */
  options?: object[];

  /**
   * Maxlength
   * 选择列表渲染数据
   * @description 该项需要渲染的数据列表
   * @default []
   * @type array
   */
  maxlength?: number;
}

@Component({
  name: 'CommonForm',
  components: {
  },
  props: {
    Form
  }
})
export class MilkForm extends Vue {
  // 提交按钮加载
  @Prop({ default: false, type: Boolean })
  private submitLoading!: Boolean;

  @Prop({ default: true, type: Boolean })
  private showCancel!: Boolean;

  @Prop({ default: 50, type: Number })
  private maxlength!: Number;

  // 数据源
  @Prop({ default: () => [], type: Array })
  private source!: FormDataSlot[];

  // 子栏目布局
  @Prop({ default: 'vertical', type: String })
  private formLayout!: string;

  // 子栏目布局
  @Prop({
    default: () => {
      return {};
    },
    type: Object
  })
  private itemLayout!: FormLayoutSlot;

  // 自定义渲染
  @Prop({ default: '' })
  private customRender!: Function;

  // 是否校验
  @Prop({ default: true, type: Boolean })
  private validate!: Boolean;

  // 表单类型 edit:编辑表单/filter:查询表单
  @Prop({ default: 'edit', type: String })
  private type!: String;

  /**
   * 按钮是否换行--只针对内联样式的表单
   */
  @Prop({ default: false, type: Boolean })
  private buttonWrap!: Boolean;

  @Prop({ default: true, type: Boolean })
  private showButton!: Boolean;

  private activeForm: any = this.Form;

  @Emit()
  private handleConfirm() {
    this.Form.validateFields((err: any, values: any) => {
      if (!err) {
        let values = this.activeForm.getFieldsValue();
        if (this.type == 'filter') {
          // filter表单过滤undefined值
          for (let key in values) {
            if (!values[key]) {
              delete values[key];
            }
          }
        }
        this.$emit('confirm', values);
      }
    });
  }

  @Emit()
  private handleCancel() {
    if (this.type == 'filter') {
      //重置表单
      this.Form.resetFields();
      this.$emit('cancel');
      return;
    }
    this.$emit('cancel');
  }

  private compare(compare: any, value: any, callback: any) {
    let target = this.Form.getFieldsValue()[compare.target];
    if (compare.condition == 'gt') {
      if (Number(target) > Number(value)) {
        return callback(
          new Error(compare.message ? compare.message : '目标值比当前值大')
        );
      }
    } else if (compare.condition == 'lt') {
      if (Number(target) < Number(value)) {
        return callback(
          new Error(compare.message ? compare.message : '目标值比当前值小')
        );
      }
    } else {
      if (Number(target) != Number(value)) {
        return callback(
          new Error(compare.message ? compare.message : '目标值比当前值不想等')
        );
      }
    }

    return null;
  }

  /**
   * 表单内置一些校验规则,外部引用可直接配置
   * @param type
   */
  private getValidator(
    rule: any,
    value: any,
    callback: any,
    obj: FormDataSlot
  ) {
    let type = obj.validator;
    let message = obj.validateMessage;
    let validatorCompare = obj.validatorCompare;
    switch (type) {
      case 'price':
        if (/^\d+(?=\.{0,1}\d+$|$)/.test(value)) {
          if (validatorCompare) {
            let cr = this.compare(validatorCompare, value, callback);
            if (cr == null) {
              callback();
            }
          } else {
            callback();
          }
        } else {
          callback(new Error(message ? message : '请输入正确的金额'));
        }
        break;
      case 'number':
        if (/^[0-9]+$/.test(value)) {
          callback();
        } else {
          callback(new Error(message ? message : '请输入正确的数字'));
        }
        break;
      case 'telephone':
        if (/^1[3456789]\d{9}$/.test(value)) {
          callback();
        } else {
          callback(new Error(message ? message : '请输入正确的手机号码'));
        }
        break;
      case 'email':
        if (
          /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(
            value
          )
        ) {
          callback();
        } else {
          callback(new Error(message ? message : '请输入正确的邮箱'));
        }
        break;
      default:
        break;
    }
  }

  renderFormItem(getFieldDecorator: any, item: FormDataSlot) {
    let type = item.type;
    let rule: object[] = [];
    if (!item.rule) {
      let message = item.validator
        ? {
            validator: (rule: any, value: any, callback: any) => {
              return this.getValidator(rule, value, callback, item);
            }
          }
        : { message: `请输入${item.label}` };
      rule = [
        {
          required: this.validate,
          ...message
        }
      ];
    } else {
      rule = item.rule;
    }
    let dom = null;
    let placeholder = `请输入${item.label}`;
    switch (type) {
      case 'text':
        dom = (
          <a-input
            disabled={item.editable ? item.editable : false}
            maxLength={item.maxlength ? item.maxlength : this.maxlength}
            style={{ width: item.width ? item.width : '100%' }}
            placeholder={placeholder}
          />
        );
        break;
      case 'textarea':
        dom = (
          <a-textarea
            disabled={item.editable ? item.editable : false}
            maxLength={this.maxlength}
            style={{ width: item.width ? item.width : '100%' }}
            placeholder={placeholder}
          />
        );
        break;
      case 'date':
        if (!item.init) {
          item.init = null;
        }
        dom = (
          <a-date-picker
            disabled={item.editable ? item.editable : false}
            style={{ width: item.width ? item.width : '100%' }}
            placeholder={placeholder}
          />
        );
        break;
      case 'checkbox':
        if (!item.options) break;
        dom = (
          <a-checkbox-group
            disabled={item.editable ? item.editable : false}
            style={{ width: item.width ? item.width : '100%' }}
            options={item.options}
          />
        );
        break;
      case 'number':
        if (!item.options) break;
        dom = (
          <a-input-number
            disabled={item.editable ? item.editable : false}
            maxLength={this.maxlength}
            style={{ width: item.width ? item.width : '100%' }}
            placeholder={placeholder}
          />
        );
        break;
      case 'daterange':
        dom = (
          <a-range-picker
            disabledDate={(current: any) => current > moment().endOf('day')}
            disabled={item.editable ? item.editable : false}
            style={{ width: item.width ? item.width : '100%' }}
          />
        );
        break;
      case 'select':
        if (!item.options) break;
        dom = (
          <a-select
            disabled={item.editable ? item.editable : false}
            placeholder={placeholder}
            style={{ width: item.width ? item.width : '120px' }}
          >
            {item.options.map((o: any, i: number) => {
              return (
                <a-select-option value={o.value}>{o.label}</a-select-option>
              );
            })}
          </a-select>
        );
        break;
      default:
        break;
    }
    return (
      <a-form-item
        label={item.label}
        {...(this.itemLayout.item ? { props: this.itemLayout.item } : '')}
      >
        {getFieldDecorator(item.key, {
          initialValue: item.init,
          rules: rule
        })(dom)}
      </a-form-item>
    );
  }

  renderOperations() {
    if (this.customRender) {
      return (
        <a-form-item
          {...(this.itemLayout.button ? { props: this.itemLayout.button } : '')}
        >
          {this.customRender()}
        </a-form-item>
      );
    }
    return (
      <div
        class={{
          'align-right': this.buttonWrap && this.formLayout === 'inline',
          inline: this.formLayout === 'inline'
        }}
      >
        <a-form-item
          {...(this.itemLayout.button ? { props: this.itemLayout.button } : '')}
        >
          <a-button
            type='primary'
            loading={this.submitLoading}
            on-click={this.handleConfirm}
          >
            {this.type == 'filter' ? '查询' : '确定'}
          </a-button>
          {this.showCancel ? (
            <a-button class='ml20' on-click={this.handleCancel}>
              {this.type == 'filter' ? '重置' : '取消'}
            </a-button>
          ) : (
            ''
          )}
        </a-form-item>
      </div>
    );
  }

  /**
   * 对外暴露获取表单数据的方法
   * @return 表单数据
   */
  getForm() {
    // TODO
    // 父组件实际上并非调用此方法,写在这里只是为了解决typescript的引用
    return this.$props.Form;
  }

  render() {
    const { getFieldDecorator } = this.activeForm;
    return (
      <a-form layout={this.formLayout}>
        {this.source.map((item: FormDataSlot, index: number) =>
          this.renderFormItem(getFieldDecorator, item)
        )}
        {this.renderOperations()}
      </a-form>
    );
  }
}

export default Form.create({
  props: {
    source: Array,
    submitLoading: Boolean,
    formLayout: String,
    itemLayout: Object,
    customRender: Function,
    validate: Boolean,
    type: String,
    showCancel: Boolean,
    buttonWrap: Boolean
  }
})(MilkForm);
