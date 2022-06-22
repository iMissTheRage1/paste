import type {AnchorProps} from '@twilio-paste/anchor';
import type {BoxElementProps} from '@twilio-paste/box';
import type {GenericIconProps} from '@twilio-paste/icons/esm/types';

export type MessageVariants = 'inbound' | 'outbound';

export interface ChatMessageProps {
  children?: React.ReactNode;
  variant: MessageVariants;
  element?: BoxElementProps['element'];
}

export interface ChatBubbleProps {
  children?: React.ReactNode;
  element?: BoxElementProps['element'];
}

export interface ChatMessageMetaProps {
  ['aria-label']: string;
  children: NonNullable<React.ReactNode>;
  element?: BoxElementProps['element'];
}

export interface ChatMessageMetaItemProps {
  children: NonNullable<React.ReactNode>;
  element?: BoxElementProps['element'];
}

export interface ChatAttachmentProps {
  children: NonNullable<React.ReactNode>;
  element?: BoxElementProps['element'];
  attachmentIcon: React.FC<GenericIconProps>;
}

export interface ChatAttachmentContainerProps {
  children: NonNullable<React.ReactNode>;
  element?: BoxElementProps['element'];
  i18nDismissLabel?: string;
  loading?: boolean;
  onDismiss: () => void;
}

export interface ChatAttachmentLinkProps extends AnchorProps {
  children: string;
  element?: BoxElementProps['element'];
}
export interface ChatAttachmentDescriptionProps {
  children: string;
  element?: BoxElementProps['element'];
}
