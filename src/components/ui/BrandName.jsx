import styled from 'styled-components';

const StyledText = styled.text`
    color: ${({ theme }) => theme.palette.primary.main};
    align-items: center;
`

const BrandName = () => {
    return <StyledText>
        Brand Name
    </StyledText>
}

export default BrandName;