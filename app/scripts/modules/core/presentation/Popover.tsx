import * as React from 'react';
import { OverlayTrigger, Popover as BSPopover } from 'react-bootstrap';

import { Placement } from 'core/presentation/Placement';

interface IProps {
  value?: string;
  template?: JSX.Element;
  placement?: Placement;
}

export class Popover extends React.Component<IProps, void> {
  public static defaultProps: Partial<IProps> = {
    placement: 'top',
    value: ''
  };

  public render() {
    let popover = <BSPopover id={this.props.value}>{this.props.value}</BSPopover>;
    if (this.props.template) {
      popover = <BSPopover id={this.props.value}>{this.props.template}</BSPopover>;
    }

    return (
      <OverlayTrigger placement={this.props.placement} overlay={popover}>
        {this.props.children}
      </OverlayTrigger>
    );
  }
}
