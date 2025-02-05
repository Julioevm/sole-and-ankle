import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'new-release' && <NewRelease>Just released!</NewRelease>}
          {variant === 'on-sale' && <Sale>Sale</Sale>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>

          {variant === 'on-sale' ? (
            <SaleWrapper>
              <GreyedPrice>{formatPrice(price)}</GreyedPrice>
              <SalePrice>{formatPrice(salePrice)}</SalePrice>
            </SaleWrapper>
          ) : (
            <Price>{formatPrice(price)}</Price>
          )}
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  flex: 1 1 300px;
  max-width: 460px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const GreyedPrice = styled.span`
  color: ${COLORS.gray[500]};
  text-decoration: line-through;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const NewRelease = styled.span`
  position: absolute;
  top 16px;
  right -5px;
  font-weight: ${WEIGHTS.medium};
  color:  ${COLORS.white};
  background-color: ${COLORS.secondary};
  padding: 5px 10px;
  border-radius: 4px;
`;

const Sale = styled.span`
  position: absolute;
  top 16px;
  right -5px;
  font-weight: ${WEIGHTS.medium};
  color:  ${COLORS.white};
  background-color: ${COLORS.primary};
  padding: 5px 10px;
  border-radius: 4px;
`;

const SaleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ShoeCard;
