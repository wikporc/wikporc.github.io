import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledLanguagesSection = styled.section`
  max-width: 900px;

  .languages-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 50px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledLanguageTile = styled.li`
  ${({ theme }) => theme.mixins.boxShadow};
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 30px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      transform: translateY(-5px);
    }
  }

  .flag {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    overflow: hidden;
    border-radius: 50%;
    ${({ theme }) => theme.mixins.flexCenter};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .language-name {
    margin: 0 0 5px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  .language-level {
    margin: 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const Languages = () => {
  const data = useStaticQuery(graphql`
    query {
      languages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/languages/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              level
              flag {
                publicURL
              }
            }
          }
        }
      }
    }
  `);

  const languagesData = data.languages.edges;
  const revealTitle = useRef(null);
  const revealTiles = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealTiles.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledLanguagesSection id="languages">
      <h2 className="numbered-heading" ref={revealTitle}>
        Languages
      </h2>

      <ul className="languages-grid">
        {languagesData &&
          languagesData.map(({ node }, i) => {
            const { title, level, flag } = node.frontmatter;

            return (
              <StyledLanguageTile key={i} ref={el => (revealTiles.current[i] = el)}>
                <div className="flag">
                  {flag && <img src={flag.publicURL} alt={`${title} flag`} />}
                </div>
                <div>
                  <h3 className="language-name">{title}</h3>
                  <p className="language-level">{level}</p>
                </div>
              </StyledLanguageTile>
            );
          })}
      </ul>
    </StyledLanguagesSection>
  );
};

export default Languages;
