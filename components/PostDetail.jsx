import React from "react";
import moment from "moment";

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    // console.log(index, text, obj, type);
    let modifiedText = text;

    if (type == "class") {
      const locationId = obj.children[0].children[0].text;
      return getGYGWidget(locationId);
    }

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    if (obj.type === "link") {
      return (
        <a
          key={index}
          className="text-md font-semibold mb-4 cursor-pointer text-purple-700 hover:underline"
          href={obj.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {obj.children[0].text}
        </a>
      );
    }

    switch (type) {
      case "heading-five":
        return (
          <h5 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h5>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "heading-two":
        return (
          <h2 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        );
      case "heading-one":
        return (
          <h1 key={index} className="text-4xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h1>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {Array.isArray(modifiedText)
              ? modifiedText.map((item, i) => (
                  <React.Fragment key={i}>{item}</React.Fragment>
                ))
              : modifiedText}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="pb-4"
          />
        );
      case "iframe":
        return (
          <iframe
            key={index}
            height={obj.height}
            width={obj.width}
            src={obj.url}
            className="pb-4 sm:width-250"
          />
        );

      case "bulleted-list":
        return (
          <ul key={index} className="mb-8">
            {obj.children &&
              obj.children.map((listItem, i) => (
                <li key={i} className="list-item-child list-disc ml-8">
                  {listItem.children &&
                    listItem.children.map((child, childIndex) => (
                      <React.Fragment key={childIndex}>
                        {child.children &&
                          child.children.map((textItem, textIndex) => (
                            <React.Fragment key={textIndex}>
                              {getContentFragment(
                                textIndex,
                                textItem.text,
                                textItem,
                                textItem.type
                              )}
                            </React.Fragment>
                          ))}
                      </React.Fragment>
                    ))}
                </li>
              ))}
          </ul>
        );

      case "numbered-list":
        return (
          <ul key={index} className="mb-8">
            {obj.children &&
              obj.children.map((listItem, i) => (
                <li key={i} className="list-item-child list-decimal ml-8">
                  {listItem.children &&
                    listItem.children.map((child, childIndex) => (
                      <React.Fragment key={childIndex}>
                        {child.children &&
                          child.children.map((textItem, textIndex) => (
                            <React.Fragment key={textIndex}>
                              {textItem.children &&
                                textItem.children.map((textItem, textIndex) => (
                                  <React.Fragment key={textIndex}>
                                    {getContentFragment(
                                      textIndex,
                                      textItem.text,
                                      textItem,
                                      textItem.type
                                    )}
                                  </React.Fragment>
                                ))}
                            </React.Fragment>
                          ))}
                      </React.Fragment>
                    ))}
                </li>
              ))}
          </ul>
        );

      case "link":
        return (
          <link key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </link>
        );

      default:
        return modifiedText;
    }
  };

  const getGYGWidget = (id) => {
    return (
      <div
        data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
        data-gyg-location-id={id}
        data-gyg-locale-code="en-US"
        data-gyg-widget="activities"
        data-gyg-number-of-items="3"
        data-gyg-partner-id="1SPD11R"
      ></div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-between mb-8 w-full">
          {/* <div className='flex items-center mb-4 lg:mb-0 lg:w-auto mr-8'>
          <img 
          alt={post.author.name}
          height='30px'
          width='30px'
          className='align-middle'
          src={post.author.photo.url}
          />
          <p className='inline align-middle text-gray-700 ml-2 text-lg'>{post.author.name}</p>
        </div> */}
          <div className="font-medium text-gray-700 mb-4 lg:mb-0 lg:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-purple-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
