import * as React from 'react';
import * as PropTypes from 'prop-types';
import {FileIcon} from '@twilio-paste/icons/esm/FileIcon';
import {MediaObject, MediaFigure, MediaBody} from '@twilio-paste/media-object';
import {Text} from '@twilio-paste/text';
import {Spinner} from '@twilio-paste/spinner';
import {Truncate} from '@twilio-paste/truncate';

import type {ChatAttachmentProps} from './types';

const ChatAttachment = React.forwardRef<HTMLDivElement, ChatAttachmentProps>(
  ({i18nLoadingDescription, i18nIconDescription, attachmentTitle}) => {
    return (
      <MediaObject as="div" verticalAlign="center">
        <MediaFigure as="div" spacing="space40">
          <Spinner decorative={false} title={i18nLoadingDescription} />
          <FileIcon decorative={false} title={i18nIconDescription} />
        </MediaFigure>
        <MediaBody as="div">
          <Truncate title={attachmentTitle}>
            <Text as="div" color="colorTextWeak" fontSize="fontSize20" lineHeight="lineHeight10">
              {attachmentTitle}
            </Text>
          </Truncate>
          <Text as="div" fontSize="fontSize30" fontWeight="fontWeightSemibold" lineHeight="lineHeight10">
            3 GB
          </Text>
        </MediaBody>
      </MediaObject>
    );
  }
);

ChatAttachment.displayName = 'ChatBubble';

// FOR A DOC:
// Box that encapsulates the attachment (Card?)
// media object inside the attachment
// Media: when loading, a Spinner.
// Media: when loaded, an Icon
// Title of the attachment in a Truncate
// metadata underneath (chat message meta?)
// when loaded: little close x (need circle button?)

// FOR AN IMAGE:
// Box that encapsulates the attachment (Card?)
// Image preview fills the box

export {ChatAttachment};
