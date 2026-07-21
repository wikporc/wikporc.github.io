import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;
  padding-top: 20px;
`;
const StyledText = styled.div`
  p {
    text-align: justify;
  }
`;

const StyledSkillsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  margin-top: 30px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSkillGroup = styled.li`
  ${({ theme }) => theme.mixins.boxShadow};
  padding: 1.5rem 1.75rem;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      transform: translateY(-5px);
    }
  }

  h3 {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    text-align: center;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin-bottom: 8px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
const About = () => {
  const data = useStaticQuery(graphql`
    query {
      about: markdownRemark(fileAbsolutePath: { regex: "/content/about/" }) {
        frontmatter {
          skillGroups {
            name
            skills
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillGroups = data.about?.frontmatter?.skillGroups;

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <StyledText>
        <div>
          <p>
            I’m a Material Scientist with a background in advanced materials, ink formulations, and
            laboratory automation. With more than 3 years of experience, I'm proficient in both
            independent R&D and product development within fast-paced, deep-tech environments.
          </p>

          <p>
            Recently I have been expanding my Data Science skills through an intensive full-time
            boot-camp at{' '}
            <a href="https://becode.org/" target="_blank" rel="noreferrer">
              BeCode.
            </a>
          </p>

          <p></p>

          <p>Here are a few technologies I’ve been working with recently:</p>
        </div>
      </StyledText>

      <StyledSkillsGrid>
        {skillGroups &&
          skillGroups.map(({ name, skills }, i) => (
            <StyledSkillGroup key={i}>
              <h3>{name}</h3>
              <ul>{skills && skills.map((skill, j) => <li key={j}>{skill}</li>)}</ul>
            </StyledSkillGroup>
          ))}
      </StyledSkillsGrid>
    </StyledAboutSection>
  );
};

export default About;
