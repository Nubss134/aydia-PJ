$(document).ready(function () {
    let chooseCouponTypeModal = {
        usageScope: null,
        hasUsageCode: false,
        listenUserAction: function () {
            let self = this;
            self.usageScope = $("input[name='usage_scope']:checked").val();
            $("input[name='usage_scope']").change(function () {
                self.usageScope = $(this).val();
            });

            self.hasUsageCode = $("input[name='has_usage_code']:checked").val();
            $("input[name='has_usage_code']").change(function () {
                self.hasUsageCode = $(this).val();
            });

            $("#continue_add_coupon_btn").click(function () {
                coupon.couponVue.showCouponForm(self.usageScope, self.hasUsageCode);
                $("#choose_coupon_type_modal").modal("hide");
                $("#save_coupon_modal").modal('show');
            });
        },

    };
    chooseCouponTypeModal.listenUserAction();
});
