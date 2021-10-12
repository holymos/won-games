import { Heading } from "components/Heading";
import * as S from "./styles";

export type TextContentProps = {
  title?: string;
  content: string;
};

export function TextContent({ title, content }: TextContentProps) {
  return (
    <S.Wrapper data-cy="content">
      {!!title && (
        <Heading lineLeft lineColor="secondary">
          {title}
        </Heading>
      )}

      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </S.Wrapper>
  );
}
