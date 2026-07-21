import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }

    p {
      text-align: justify;
    }

    ul {
      ${({ theme }) => theme.mixins.fancyList};

      li {
        text-align: justify;
      }
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    .carousel {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: var(--light-navy);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus-within {
        .carousel-arrow {
          opacity: 1;
        }
      }
    }

    .carousel-image-button {
      display: block;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;
    }

    .carousel-arrow {
      ${({ theme }) => theme.mixins.flexCenter};
      position: absolute;
      top: 50%;
      z-index: 4;
      width: 32px;
      height: 32px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background-color: var(--light-navy);
      color: var(--green);
      opacity: 0;
      cursor: pointer;
      transform: translateY(-50%);
      transition: var(--transition);

      &:hover,
      &:focus {
        background-color: var(--lightest-navy);
      }

      &.prev {
        left: 10px;
      }
      &.next {
        right: 10px;
      }

      svg {
        width: 18px;
        height: 18px;
      }

      @media (max-width: 768px) {
        opacity: 1;
      }
    }

    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      position: absolute;
      right: 0;
      bottom: 12px;
      left: 0;
      z-index: 4;
    }

    .carousel-dot {
      width: 8px;
      height: 8px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background-color: var(--lightest-navy);
      cursor: pointer;
      transition: var(--transition);

      &.active {
        background-color: var(--green);
      }
    }

    .img {
      border-radius: var(--border-radius);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
      }
    }
  }
`;

const StyledLightbox = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  padding: 60px;
  background-color: rgba(2, 12, 27, 0.9);
  cursor: zoom-out;

  @media (max-width: 600px) {
    padding: 20px;
  }

  .lightbox-img {
    max-width: 100%;
    max-height: 100%;
    cursor: default;

    img {
      border-radius: var(--border-radius);
    }
  }

  .lightbox-close {
    ${({ theme }) => theme.mixins.flexCenter};
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background-color: var(--light-navy);
    color: var(--lightest-slate);
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--green);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .lightbox-arrow {
    ${({ theme }) => theme.mixins.flexCenter};
    position: absolute;
    top: 50%;
    width: 48px;
    height: 48px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background-color: var(--light-navy);
    color: var(--green);
    cursor: pointer;
    transform: translateY(-50%);

    &:hover,
    &:focus {
      background-color: var(--lightest-navy);
    }

    &.prev {
      left: 20px;
    }
    &.next {
      right: 20px;
    }

    svg {
      width: 24px;
      height: 24px;
    }

    @media (max-width: 600px) {
      width: 36px;
      height: 36px;

      &.prev {
        left: 10px;
      }
      &.next {
        right: 10px;
      }
    }
  }

  .lightbox-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const ImageCarousel = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const thumbImage = images[activeIndex]?.childImageSharp?.thumb;
  const fullImage = images[activeIndex]?.childImageSharp?.full;
  const hasMultiple = images.length > 1;

  const showPrev = () => setActiveIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const showNext = () => setActiveIndex(i => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = e => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (hasMultiple && e.key === 'ArrowLeft') {
        showPrev();
      } else if (hasMultiple && e.key === 'ArrowRight') {
        showNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isLightboxOpen, hasMultiple]);

  return (
    <div className="carousel">
      <button
        className="carousel-image-button"
        aria-label={`View full-size image ${activeIndex + 1} of ${images.length}`}
        onClick={() => setIsLightboxOpen(true)}>
        <GatsbyImage
          image={thumbImage}
          alt={`${title} screenshot ${activeIndex + 1}`}
          className="img"
        />
      </button>

      {hasMultiple && (
        <>
          <button className="carousel-arrow prev" aria-label="Previous image" onClick={showPrev}>
            <Icon name="ChevronLeft" />
          </button>
          <button className="carousel-arrow next" aria-label="Next image" onClick={showNext}>
            <Icon name="ChevronRight" />
          </button>

          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === activeIndex ? ' active' : ''}`}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </>
      )}

      {isLightboxOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <StyledLightbox
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image ${activeIndex + 1} of ${images.length}`}
            onClick={() => setIsLightboxOpen(false)}>
            <button
              className="lightbox-close"
              aria-label="Close full-size image"
              onClick={() => setIsLightboxOpen(false)}>
              <Icon name="Close" />
            </button>

            <GatsbyImage
              image={fullImage}
              alt={`${title} screenshot ${activeIndex + 1}`}
              className="lightbox-img"
              objectFit="contain"
              onClick={e => e.stopPropagation()}
            />

            {hasMultiple && (
              <>
                <button
                  className="lightbox-arrow prev"
                  aria-label="Previous image"
                  onClick={e => {
                    e.stopPropagation();
                    showPrev();
                  }}>
                  <Icon name="ChevronLeft" />
                </button>
                <button
                  className="lightbox-arrow next"
                  aria-label="Next image"
                  onClick={e => {
                    e.stopPropagation();
                    showNext();
                  }}>
                  <Icon name="ChevronRight" />
                </button>

                <div className="lightbox-counter">
                  {activeIndex + 1} / {images.length}
                </div>
              </>
            )}
          </StyledLightbox>,
          document.body,
        )}
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      childImageSharp: PropTypes.shape({
        thumb: PropTypes.object,
        full: PropTypes.object,
      }),
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              images {
                childImageSharp {
                  thumb: gatsbyImageData(
                    width: 700
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                  full: gatsbyImageData(
                    width: 1600
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, images } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      {external ? <a href={external}>{title}</a> : title}
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech?.length > 0 && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  {images && images.length > 0 && <ImageCarousel images={images} title={title} />}
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
