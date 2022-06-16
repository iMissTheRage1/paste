export type MessageVariants = 'inbound' | 'outbound';

export interface ChatMessageProps {
  children?: React.ReactNode;
  variant: MessageVariants;
  element?: string;
}

export interface ChatBubbleProps {
  children?: React.ReactNode;
  element?: string;
}

export interface ChatMessageMetaProps {
  ['aria-label']: string;
  children: NonNullable<React.ReactNode>;
  element?: string;
}

export interface ChatMessageMetaItemProps {
  children: NonNullable<React.ReactNode>;
  element?: string;
}

export interface ChatAttachmentProps {
  children?: NonNullable<React.ReactNode>; //should this be required or not?
  element?: string;
  i18nLoadingDescription?: string; //should this be required or not?
  i18nIconDescription?: string; //should this be required or not?
  attachmentTitle: string;
}
