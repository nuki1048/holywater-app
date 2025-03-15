import { Stack, styled, Text, XStack } from 'tamagui';
import { Book } from '../../../types';
const StyledStack = styled(Stack, {
  justifyContent: 'center',
  alignItems: 'center',
});
const BoldText = styled(Text, {
  fontWeight: '700',
  fontSize: 18,
  color: '#0B080F',
});
const CaptionText = styled(Text, {
  fontWeight: '600',
  fontSize: 12,
  color: '#D9D5D6',
});

interface BookDetailsProps {
  views: string | undefined;
  likes: string | undefined;
  quotes: string | undefined;
  genre: string | undefined;
}
export const BookDetails: React.FC<BookDetailsProps> = ({
  views,
  likes,
  quotes,
  genre,
}) => {
  return (
    <XStack
      width='100%'
      paddingBottom={20}
      justifyContent='space-between'
      borderBottomColor='#D9D5D6'
      borderBottomWidth={1}
    >
      <StyledStack>
        <BoldText>{views}</BoldText>
        <CaptionText>Readers</CaptionText>
      </StyledStack>
      <StyledStack>
        <BoldText>{likes}</BoldText>
        <CaptionText>Likes</CaptionText>
      </StyledStack>
      <StyledStack>
        <BoldText>{quotes}</BoldText>
        <CaptionText>Quotes</CaptionText>
      </StyledStack>
      <StyledStack>
        <BoldText>{genre}</BoldText>
        <CaptionText>Genre</CaptionText>
      </StyledStack>
    </XStack>
  );
};
