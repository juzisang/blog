import Vue, { CreateElement, VNode } from "vue";
import { RenderContext, DefaultProps as Props } from "vue/types/options";

declare module "vue/types/vue" {
  interface Vue {
    render?(createElement: CreateElement, hack: RenderContext<Props>): VNode;
    renderError?: (h: () => VNode, err: Error) => VNode;
    beforeCreate?(this: Vue): void;
    created?(): void;
    beforeDestroy?(): void;
    destroyed?(): void;
    beforeMount?(): void;
    mounted?(): void;
    beforeUpdate?(): void;
    updated?(): void;
    activated?(): void;
    deactivated?(): void;
    errorCaptured?(err: Error, vm: Vue, info: string): boolean | void;
  }
}
