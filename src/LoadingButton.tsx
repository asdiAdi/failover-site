import { clsx } from "clsx";

type LoadingButtonProps = {
  text: string;
  loading: boolean;
  link?: string;
  target?: string;
};

export default function LoadingButton(props: LoadingButtonProps) {
  const { text, loading = false, link, target } = props;

  return (
    <div
      className={clsx("loading-button", {
        "loading-button--disabled": loading,
      })}
    >
      {loading && <i className="fa fa-spinner fa-spin" />}

      {link && (
        <a href={`https://${link}`} rel="noreferrer noopener" target={target}>
          {text}
        </a>
      )}
      {!link && text}
    </div>
  );
}
