import * as React from 'react';
import * as PropTypes from 'prop-types';
import type {BoxElementProps} from '@twilio-paste/box';
import {MediaObject, MediaFigure, MediaBody} from '@twilio-paste/media-object';
import {Stack} from '@twilio-paste/stack';

export interface ChatAttachmentProps {
  children: NonNullable<React.ReactNode>;
  element?: BoxElementProps['element'];
  attachmentIcon: NonNullable<React.ReactNode>;
}

const ChatAttachment = React.forwardRef<HTMLDivElement, ChatAttachmentProps>(
  ({children, element = 'CHAT_ATTACHMENT', attachmentIcon, ...props}, ref) => {
    return (
      <MediaObject as="div" ref={ref} verticalAlign="center" element={element} {...props}>
        <MediaFigure element={`${element}_ICON`} as="div" spacing="space40">
          {attachmentIcon}
        </MediaFigure>
        <MediaBody as="div" element={`${element}_BODY`}>
          <Stack element={`${element}_STACK`} orientation="vertical" spacing="space10">
            {children}
          </Stack>
        </MediaBody>
      </MediaObject>
    );
  }
);

ChatAttachment.displayName = 'ChatAttachment';

ChatAttachment.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  attachmentIcon: () => {
    return null;
  },
};

export {ChatAttachment};
