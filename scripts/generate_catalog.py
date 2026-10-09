import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "catalog-data.js"


def collect_catalog_items():
    items = []
    for directory in sorted(ROOT.iterdir()):
        if not directory.is_dir() or directory.name.startswith("."):
            continue

        for text_file in sorted(directory.glob("*.txt")):
            name = text_file.read_text(encoding="utf-8").strip()
            if not name:
                continue

            items.append(
                {
                    "directory": directory.name,
                    "file": text_file.name,
                    "name": name,
                    "path": f"{directory.name}/index.html",
                }
            )
    return items


def main():
    data = json.dumps(collect_catalog_items(), ensure_ascii=False, indent=2)
    OUTPUT.write_text(f"window.designCatalog = {data};\n", encoding="utf-8")
    print(f"Generated {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
